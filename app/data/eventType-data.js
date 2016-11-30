'use strict';

module.exports = function (models) {
    const EventType = models.EventType;

    return {
        createEventType(typeName) {
            let eventType = new EventType({
                typeName
            });

            return new Promise((resolve, reject) => {
                eventType.save((error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(eventType);
                });
            });
        },
        getAllEventTypes() {
            return new Promise((resolve, reject) => {
                EventType.find((err, eventTypes) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(eventTypes);
                });
            });
        },
    };
};