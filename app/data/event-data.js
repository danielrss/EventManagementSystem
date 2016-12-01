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

            return Promise.all([dataUtils.loadOrCreateType(EventType, eventData.eventType), dataUtils.loadOrCreateType(Country, eventData.country),dataUtils.loadOrCreateType(City, eventData.city)])
                .then(([dbEventType, dbCountry, dbCity ])=>{
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
                Event.find({ isApproved: true }, (err, events) => {
                    let eventsByTypes = {};

                    for (let i = 0, eventsCount = events.length; i < eventsCount; i++) {
                        let current = events[i],
                            typeName = current.eventType.name;
                        if(!eventsByTypes[typeName]) {
                            eventsByTypes[typeName] = { name: typeName, events:[] };
                        }
                        eventsByTypes[typeName].events.push(current);
                    }

                    if (err) {
                        return reject(err);
                    }

                    return resolve(eventsByTypes);
                });
                
            });
        },
        searchEvents() {
            return new Promise((resolve, reject) => {
                Event.find()
                    .exec((err, events) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(events || []);
                    });
            });
        },
        getAllAwaitingEvents() {
            return new Promise((resolve, reject) => {
                Event.find({ isApproved: false, isDeleted: false }, (err, events) => {
                    if(err) {
                        return reject(err);
                    }

                    return resolve(events);
                });
            });
        }
    };
};