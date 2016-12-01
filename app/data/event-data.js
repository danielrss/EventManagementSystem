'use strict';

module.exports = function(models) {
    const dataUtils = require('./utils/data-utils'),
        mapper = require('../utils/mapper'),
        Event = models.Event,
        EventType = models.EventType;

    return {
        createEvent(name, eventTypeName, location, description, dateOfEvent, coverUrl, capacity) {
            let eventType;

            return dataUtils.loadOrCreateEventType(EventType, eventTypeName)
                .then(dbEventType => {
                    eventType = dbEventType;

                    let event = new Event({
                        name,
                        eventType: mapper.map(eventType, '_id', 'name'),
                        location,
                        description,
                        dateOfEvent,
                        coverUrl,
                        capacity
                    });

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
        getAllEventTypeNames() {
            return new Promise((resolve, reject) => {
                EventType.find().distinct('name', (error, eventNames) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(eventNames);
                });

            });
        },
        getEventsGroupedByCategories() {
            return new Promise((resolve, reject) => {
                Event.find((err, events) => {
                    let groupedEvents = dataUtils.groupEvents(events);

                    if (err) {
                        return reject(err);
                    }

                    return resolve(groupedEvents);
                });

            });
        },
        searchEvents(options) {
            return new Promise((resolve, reject) => {
                Event.find(options)
                    .exec((err, resultEvents) => {
                        let groupEvents = dataUtils.groupEvents(resultEvents);

                        if (err) {
                            return reject(err);
                        }

                        return resolve(groupEvents || []);
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