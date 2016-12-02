'use strict';

const helpers = require('../helpers');
const COUNT_OF_EVENTS = 5;

module.exports = function(data) {
    return {
        createEvent(req, res) {
            if(req.user.role === 'admin') {
                req.body.isApproved = true;
            }

            return data.createEvent(req.body, req.user)
                .then(event => {
                    res.status(200)
                            .send({ redirectRoute: '/events' });
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
                });
        },
        getCreateEventForm(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect('/login');
            }

            return Promise.all([data.getAllEventTypes(), data.getAllCities(), data.getAllCountries()])
                .then(([eventTypes, cities, countries]) => {
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
                    if (event.isApproved) {
                        return res.render('event/event-details', {
                            event,
                            user: req.user
                        });
                    } else {
                        return res.redirect('/events');
                    }
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
                });
        },
        getSpecificEvents(req, res) {
            data.getSpecificEvents(COUNT_OF_EVENTS)
                .then(events => {
                    res.send(events.forEach(event => {
                        return data.getEventById(event._id);
                    }));
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
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
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
                });
        },
        search(req, res) {
            let country = req.query.country,
                city = req.query.city,
                dateOfEvent = req.query.dateOfEvent,
                name = req.query.name,
                options = {};

            if (country) {
                options['country.name'] = new RegExp(country, 'i');
            }
            if (city) {
                options['city.name'] = new RegExp(city, 'i');
            }
            if (dateOfEvent) {
                options.dateOfEvent = new RegExp(dateOfEvent, 'i');
            }
            if (name) {
                options.name = new RegExp(name, 'i');
            }

            data.searchEvents(options)
                .then(events => {
                    return res.render('event/event-list', {
                        events,
                        country: country,
                        city: city,
                        dateOfEvent: dateOfEvent,
                        name: name,
                        user: req.user
                    });
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
                });
        },
        rateEvent(req, res) {
            let id = req.params.id;
            console.log(id);
            data.getEventById(id)
                .then((event) => {
                    // get current user
                    //console.log('our req user is: ' + req.user);
                    let rater = {
                        id: req.user.id,
                        username: req.user.username
                    };
                    // save current user who liked the event in the events array
                    //console.log('the body of the request contains: ' + req.body.rate);
                    if(req.body.rate === 'like') {
                        let isUnique = true;
                        for(let i = 0; i < event.usersWhoLikeThis.length; i+=1) {
                            if(rater.id === event.usersWhoLikeThis[i].id) {
                                isUnique = false;
                                break;
                            }
                        }

                        if(isUnique === true) {
                            event.usersWhoLikeThis.push(rater);
                        }
                       // console.log(event.usersWhoLikeThis);
                        event.save();
                    } else if(req.body.rate === 'dislike') {
                        let isUnique = true;
                        for(let i = 0; i < event.usersWhoDislikeThis.length; i+=1) {
                            if(rater.id === event.usersWhoDislikeThis[i].id) {
                                isUnique = false;
                                break;
                            }
                        }

                        if(isUnique === true) {
                            event.usersWhoDislikeThis.push(rater);
                        }
                        event.save();
                    }                    
                });
        }
    };
};