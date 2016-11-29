'use strict';

module.exports = function (data) {
    return {
        getAll(req, res) {
            data.getAllEvents()
                .then(events => {
                    res.render('event/event-list', {
                        result: events
                    });
                });
        },
    };
};