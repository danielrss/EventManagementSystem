'use strict';

module.exports = {
    loadOrCreateEventType(EventType, name) {
        return new Promise((resolve, reject) => {
            EventType.findOne({ name }, (err, dbEventType) => {
                let eventType = dbEventType;

                if (err) {
                    return reject(err);
                }

                if (eventType) {
                    return resolve(eventType);
                }

                eventType = new EventType({ name });
                return new Promise((resolve, reject) => {
                    eventType.save((error) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(eventType);
                    });
                });
            });
        });
    },
    groupEvents(events) {
        let eventsByTypes = {};

        for (let i = 0, eventsCount = events.length; i < eventsCount; i++) {
            let current = events[i],
                typeName = current.eventType.name;
            if (!eventsByTypes[typeName]) {
                eventsByTypes[typeName] = { name: typeName, events: [] };
            }
            eventsByTypes[typeName].events.push(current);
        }
        return eventsByTypes;
    }
};