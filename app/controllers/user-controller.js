'use strict';

module.exports = function (data) {
    return {
        getLogin(req, res) {
            return Promise.resolve()
                .then(() => {
                    res.render('user/login', {});
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
                        res.render('unathorized', { user: req.user.username });
                    }
                });
        },
        getRegister(req, res) {
            return Promise.resolve()
                .then(() => {
                    res.render('user/register', {});
                });
        }
    };
};