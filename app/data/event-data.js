'use strict';

module.exports = function(models) {
    const Event = models.Event;

    return {
        createEvent(name, eventType, location, description, dateOfEvent, coverUrl, capacity) {
            let event = new Event({
                name,
                eventType,
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
        }
    };
};