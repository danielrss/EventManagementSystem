'use strict';
const helpers = require('../helpers'),
    formidable = require('formidable'),
    fs = require('fs-extra'),
    path = require('path');

module.exports = function (data) {
    return {
        getLogin(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('user/login', {});
                    } else {
                        res.redirect('/home');
                    }
                });
        },
        getProfile(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.status(401).redirect('/unauthorized');
                    } else {
                        if(req.user.role === 'admin') {
                            res.render('user/profile', { user: req.user, isAdmin: true });
                        } else {
                            res.render('user/profile', { user: req.user, isAdmin: false });
                        }
                    }
                });
        },
        getProfileAvatar(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.status(401).redirect('/unauthorized');
                    } else {
                        if(req.user.role === 'admin') {
                            res.render('user/profile-avatar', { user: req.user, isAdmin: true });
                        } else {
                            res.render('user/profile-avatar', { user: req.user, isAdmin: false });
                        }                        
                    }
                });
        },
        uploadProfileAvatar(req, res) {
            return new Promise((resolve, reject) => {
                if (!req.isAuthenticated()) {
                    res.status(401).redirect('/unauthorized');
                    reject();
                } else {
                    let form = new formidable.IncomingForm();
                    form.maxFieldsSize = 2 * 1024 * 1024;

                    form.onPart = function(part) {
                        if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
                            form.on('end', function(fields, files) {
                                if (this.openedFiles[0].size > form.maxFieldsSize) {
                                    return reject({ name: 'ValidationError', message: 'Maximum file size is 2MB.' });
                                } else {
                                    res.status(200)
                                        .send({ redirectRoute: '/profile' });
                                }

                                /* Temporary location of our uploaded file */
                                let tempPath = this.openedFiles[0].path,
                                    openedFileName = this.openedFiles[0].name,
                                    fileExtension = openedFileName.substring(openedFileName.lastIndexOf('.'), openedFileName.length),
                                    userFolder = req.user.id,
                                    newFileName = 'avatar' + fileExtension;

                                /* Location where we want to copy the uploaded file */
                                let pathToNewFolder = path.join(__dirname, '../../public/uploads/users', userFolder);
                                if (!fs.existsSync(pathToNewFolder)){
                                    fs.mkdirSync(pathToNewFolder);
                                }

                                let pathToNewFile = path.join(pathToNewFolder, newFileName);

                                fs.copy(tempPath, pathToNewFile, function (err) {
                                    if (err) {
                                        return reject(err);
                                    }

                                    fs.remove(tempPath, (err) => {
                                        if (err) {
                                            return reject(err);
                                        }

                                        resolve(newFileName);
                                    });
                                });
                            });
                            form.handlePart(part);
                        }
                        else {
                            return reject({ name: 'ValidationError', message: 'File types allowed: jpg, jpeg, png.' });
                        }
                    };

                    form.on('error', function(err) {
                        reject(err);
                    });

                    form.parse(req);
                }
            })
            .then((fileName) => {
                let avatarUrl = '/static/uploads/users/' + req.user.id + '/' + fileName;
                data.findUserByIdAndUpdate(req.user.id, { avatarUrl });
            })
            .catch((err) => {
                res.status(400)
                    .send(JSON.stringify({ validationErrors: [err.message] }));
            });
        },
        getUnauthorized(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('unathorized', {});
                    } else {
                        res.redirect('/home');
                    }
                });
        },
        getRegister(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('user/register', {});
                    } else {
                        res.redirect('/home');
                    }
                });
        },
        updateProfile(req, res) {
            const updatedUser = req.body;

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else {
                        return data.findUserByIdAndUpdate(req.user._id, updatedUser);
                    }
                })
                .then(user => {
                    res.status(200)
                            .send({ redirectRoute: '/profile' });
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
                });
        },
        getAllEventsForApproval(req, res) {            
            return Promise.resolve()
                .then(() => {                    
                    if (!req.isAuthenticated()) {
                        res.status(401).redirect('/unauthorized');
                    } else {
                        if(req.user.role === 'admin')
                        {
                            data.getAllAwaitingEvents()
                            .then(events => {
                                res.render('user/approveEvents', { user: req.user, events: events });
                            });
                        } else {
                            res.status(401).redirect('/unauthorized');                            
                        }                 
                    }
                });
        },
        updateEvent(req, res) {
            return Promise.resolve()
            .then(() => {                                       
                data.getEventById(req.body.event)
                    .then(event => {
                        if (!req.isAuthenticated()) {
                            res.status(401).redirect('/unauthorized');
                        } else {
                            if(req.body.action === 'delete-event') {                                
                                event.isDeleted = true;
                                event.save();
                            } else if (req.body.action === 'approve-event') {
                                event.isApproved = true;
                                event.save();                              
                            }
                        }                                
                    });
                res.status(200).send({ redirectRoute: '/approvals' });
            }).catch(err => {
                res.status(400)
                    .send(JSON.stringify({ validationErrors: 'Updating failed' }));
            });
        }
    };
};