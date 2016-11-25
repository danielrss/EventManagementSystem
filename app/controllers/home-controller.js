'use strict';

module.exports = function () {
    return {
        home(req, res) {
            return Promise.resolve()
                .then(() => {
                    res.render('home', {});
                });
        }
    };
};
