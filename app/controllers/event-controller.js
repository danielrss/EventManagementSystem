'use strict';

const passport = require('passport');

const countOfEvents = 5;
module.exports = function(data) {
    return {
        createEvent(req, res) {
            return data.createEvent(req.body, req.user)
                .then(event => {
                    res.status(200)
                            .send({ redirectRoute: '/events' });
                })
                .catch(err => {
                    res.status(400)
                        .send(err);
                });
        },
        getCreateEventForm(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect('/login');
            }

            return Promise.all([data.getAllEventTypes(), data.getAllCities(), data.getAllCountries()])
                .then(([eventTypes, cities, countries ])=>{
                    return res.render('event/event-create', {
                        user: req.user,
                        eventTypes,
                        cities,
                        countries                  
                    });
                });
        },
        getEventDetails(req, res) {
            let id = req.params.id;
            data.getEventById(id)
                .then(event => {
                    if(event.isApproved){
                        return res.render('event/event-details', {
                            event,
                            user: req.user
                        });
                    }
                    else{
                        return res.redirect('/events');
                    }
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
                    if (req.isAuthenticated() && req.user.role === 'admin') {
                        return res.render('event/event-list', {
                            events,
                            user: req.user,
                            isAdmin: true
                        });
                    } else {
                        return res.render('event/event-list', {
                            events,
                            user: req.user,
                            isAdmin: false
                        });
                    }
                }))
                .catch(err => {
                    res.status(404)
                        .send(err);
                });
        },
        search(req, res) {
            let location = req.query.location,
                name = req.query.name,
                options = {};

            if (location) {
                options['location'] = new RegExp(location, 'i');
            }
            if (name) {
                options['name'] = new RegExp(name, 'i');
            }

            data.searchEvents(options)
                .then(events => {
                    return res.render('event/event-list', {
                        events,
                        location: location,
                        name: name,
                        user: req.user
                    });
                })
                .catch(err => {
                    res.status(404)
                        .send(err);
                });
        }
    };
};