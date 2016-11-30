'use strict';

const passport = require('passport');

const countOfEvents = 5;
module.exports = function(data) {
    return {
        createEvent(req, res) {
            return data.createEvent(req.name, req.eventType, req.location, req.description, req.dateOfEvent, req.capacity)
                .then(event => {
                    return res.redirect(`/events/${event._id}`);
                })
                .catch(err => {
                    res.status(400)
                        .send(err);
                });
        },
        getEventDetails(req, res) {
            let id = req.params.id;
            data.getEventById(id)
                .then(event => {
                    return res.render('event/event-details', {
                        event,
                        user: req.user
                    });
                })
                .catch(err => {
                    res.status(400)
                        .send(err);
                });
        },
        getSpecificEvents(req, res) {
            data.getSpecificEvents(countOfEvents)
                .then(events => {
                    res.send(events.forEach(event => {
                        return data.getEventById(event._id);
                    }));
                })
                .catch(err => {
                    res.status(400)
                        .send(err);
                });
        },
        getEvents(req, res) {
            data.getEventsGroupedByCategories()
                .then((events => {
                    return res.render('event/event-list', {
                        events,
                        user: req.user
                    });
                }))
                .catch(err => {
                    res.status(404)
                        .send(err);
                });
        }
    };
};