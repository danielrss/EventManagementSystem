'use strict';

module.exports = function () {
    return {
        home(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('home', {});
                    } else {
                        res.render('home', { user: req.user.username });
                    }
                });
        }
    };
};
