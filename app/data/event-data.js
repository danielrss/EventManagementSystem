'use strict';

module.exports = function(models) {
    const dataUtils = require('./utils/data-utils'),
        mapper = require('../utils/mapper'),
        Event = models.Event,
        City = models.City,
        Country = models.Country,
        EventType = models.EventType;

    return {
        createEvent(eventData, user) {
            let eventType,
                country,
                city;

            return Promise.all([dataUtils.loadType(EventType, eventData.eventType), dataUtils.loadType(Country, eventData.country), dataUtils.loadType(City, eventData.city)])
                .then(([dbEventType, dbCountry, dbCity]) => {
                    eventType = dbEventType;
                    country = dbCountry;
                    city = dbCity;
                })
                .then(() => {
                    eventData.eventType = mapper.map(eventType, '_id', 'name');
                    eventData.city = mapper.map(city, '_id', 'name');
                    eventData.country = mapper.map(country, '_id', 'name');
                    eventData.user = { name: user.fullName, id: user.id };

                    let event = new Event(eventData);

                    return new Promise((resolve, reject) => {
                        event.save((error) => {
                            if (error) {
                                return reject(error);
                            }
                            return resolve(event);
                        });
                    });
                });
        },
        getEventById(id) {
            return new Promise((resolve, reject) => {
                Event.findOne({ _id: id }, (err, event) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(event);
                });
            });
        },
        getEventByName(name) {
            return new Promise((resolve, reject) => {
                Event.findOne({ name: name }, (err, event) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(event);
                });
            });
        },
        getSpecificEvents(count) {
            return new Promise((resolve, reject) => {
                Event.find({})
                    .sort('dateOfEvent', -1)
                    .limit(count)
                    .exec((err, resultEvents) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(resultEvents);
                    });
            });
        },
        getAllEvents() {
            return new Promise((resolve, reject) => {
                Event.find((err, events) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(events);
                });
            });
        },
        getEventsGroupedByCategories() {
            return new Promise((resolve, reject) => {
                Event.find({ isApproved: true, isDeleted: false }, (err, events) => {
                    let eventsByTypes = dataUtils.groupEvents(events);

                    if (err) {
                        return reject(err);
                    }

                    return resolve(eventsByTypes);
                });

            });
        },
        searchEvents(options) {
            options.isApproved = true;
            options.isDeleted = false;

            return new Promise((resolve, reject) => {
                Event.find(options)
                    .exec((err, resultEvents) => {
                        let groupedEvents = dataUtils.groupEvents(resultEvents);
                        if (err) {
                            return reject(err);
                        }

                        return resolve(groupedEvents || []);
                    });
            });
        },
        getAllAwaitingEvents() {
            return new Promise((resolve, reject) => {
                Event.find({ isApproved: false, isDeleted: false }, (err, events) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(events);
                });
            });
        }
    };
};