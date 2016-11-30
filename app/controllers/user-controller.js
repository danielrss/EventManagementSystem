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
                        res.render('user/profile', { user: req.user });
                    }
                });
        },
        getProfileAvatar(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.status(401).redirect('/unauthorized');
                    } else {
                        res.render('user/profile-avatar', { user: req.user });
                    }
                });
        },
        uploadProfileAvatar(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.status(401).redirect('/unauthorized');
                    } else {
                        let form = new formidable.IncomingForm(),
                            files = [];

                        form.parse(req, function(err, fields, files) {
                            res.status(200)
                                .send({ redirectRoute: '/profile' });
                        });

                        form.on('end', function (fields, file) {
                            let tempPath = this.openedFiles[0].path,
                                openedFileName = this.openedFiles[0].name,
                                newFileName = req.user.id + openedFileName.substring(openedFileName.lastIndexOf('.'), openedFileName.length);

                            let userId = req.user.id;

                            let pathToNewFile = path.join(__dirname, '../../public/uploads/users', newFileName);



                            fs.copy(tempPath, pathToNewFile, function (err) {
                                if (err) {
                                    console.error(err);
                                }

                                fs.remove(tempPath, (err) => {
                                    if (err) {
                                        console.error(err);
                                    }

                                    data.findUserByIdAndUpdate(userId, { avatarUrl: '/static/uploads/users/' + newFileName });
                                });
                            });
                        });
                    }
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
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

            return data.findUserByIdAndUpdate(req.user._id, updatedUser)
                .then(user => {
                    res.status(200)
                            .send({ redirectRoute: '/profile' });
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
                });
        }
    };
};