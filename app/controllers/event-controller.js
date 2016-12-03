'use strict';

const helpers = require('../helpers'),
    formidable = require('formidable'),
    path = require('path'),
    uploader = require('../helpers/uploader');

const COUNT_OF_EVENTS = 5;

module.exports = function(data) {
    return {
        createEvent(req, res) {
            return data.createEvent(req.body, req.user)
                .then(event => {
                    res.status(200)
                            .send({ redirectRoute: '/events', eventId: event.id });
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({ validationErrors: helpers.errorHelper(err) }));
                });
        },
        uploadImage(req, res) {
            let eventId = req.params.id,
                event = {};

            return new Promise((resolve, reject) => {
                if (!req.isAuthenticated()) {
                    res.status(401).redirect('/events');
                    reject();
                } else {
                    let form = new formidable.IncomingForm();
                    form.maxFieldsSize = 2 * 1024 * 1024;

                    form.onPart = function (part) {
                        if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
                            form.on('end', function (fields, files) {
                                if (this.openedFiles[0].size > form.maxFieldsSize) {
                                    return reject({ name: 'ValidationError', message: 'Maximum file size is 2MB.' });
                                } else {
                                    res.status(200)
                                        .send({ redirectRoute: '/events' });
                                }

                                let eventFolder = eventId,
                                    pathToUploadFolder = path.join(__dirname, '../../public/uploads/events', eventFolder);

                                data.getEventById(req.params.id)
                                    .then((dbEvent) => {
                                        event = dbEvent;
                                        let newFileName = event.coverUrls.length;
                                        return newFileName;
                                    })
                                    .then(newFileName => {
                                        let uploadedFileName = uploader.uploadFile(this.openedFiles[0], pathToUploadFolder, newFileName);
                                        return uploadedFileName;
                                    })
                                    .then(uploadedFileName => {
                                        resolve(uploadedFileName);
                                    });
                            });
                            form.handlePart(part);
                        } else {
                            return reject({ name: 'ValidationError', message: 'File types allowed: jpg, jpeg, png.' });
                        }
                    };

                    form.on('error', function (err) {
                        reject(err);
                    });

                    form.parse(req);
                }
            })
            .then((fileName) => {
                if (typeof fileName !== 'string') {
                    return;
                }

                let eventImgUrl = '/static/uploads/events/' + eventId + '/' + fileName,
                    coverUrls = event.coverUrls;
                coverUrls.push(eventImgUrl);
                data.findEventByIdAndUpdate(eventId, { coverUrls });
            })
            .catch((err) => {
                res.status(400)
                    .send(JSON.stringify({ validationErrors: [err.message] }));
            });
        },
        getCreateEventForm(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect('/login');
            } else if (req.user.role !== 'admin') {
                return Promise.all([data.getAllEventTypes(), data.getAllCities(), data.getAllCountries()])
                .then(([eventTypes, cities, countries]) => {
                    return res.render('event/event-create', {
                        user: req.user,
                        eventTypes,
                        cities,
                        countries
                    });
                });
            } else {
                return Promise.all([data.getAllEventTypes(), data.getAllCities(), data.getAllCountries()])
                .then(([eventTypes, cities, countries]) => {
                    return res.render('event/event-create', {
                        user: req.user,
                        eventTypes,
                        cities,
                        countries,
                        isAdmin: true
                    });
                });
            }
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
        }
    };
};