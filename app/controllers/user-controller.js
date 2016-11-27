'use strict';

module.exports = function () {
    return {
        getLogin(req, res) {
            return Promise.resolve()
                .then(() => {
                    res.render('user/login', {});
                });
        },
        getProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect('/unauthorized');
            } else {
                const user = req.user;
                res.status(200).send(`Welcome, ${user.username}! Go to <a href="/home">Home</a>`);
            }
        },
        getUnauthorized(req, res) {
            res.send('<h1>Wa wa!</h1>');
        },
        getRegister(req, res) {
            return Promise.resolve()
                .then(() => {
                    res.render('user/register', {});
                });
        }
    };
};