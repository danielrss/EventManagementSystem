'use strict';
const passport = require('passport');

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
        updateProfile(req, res, next) {
            const updatedUser = req.body;

            // const auth = passport.authenticate('local', function (error) {
            //     if (error) {
            //         next(error);
            //         return error;
            //     }

            //     if (!updatedUser) {
            //         // res.status(400);
            //         // res.json({
            //         //     success: false,
            //         //     validationErrors: 'Invalid name or password!'
            //         // });
            //         return 'error';
            //     }

            //     req.login(updatedUser, error => {
            //         if (error) {
            //             next(error);
            //             return error;
            //         }

            //         res.sendStatus(200);
            //     });
            // });

            return Promise.resolve()
                // .then(() => {
                //     auth(req, res, next);
                // })
                .then((error) => {
                    if (error) {
                        console.log(error);
                        res.redirect('/logout');
                    }

                    data.findUserByIdAndUpdate(req.user._id, updatedUser);
                })
                .then(() => {
                    res.sendStatus(200);
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/logout');
                });
        }
    };
};