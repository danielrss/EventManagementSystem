'use strict';

module.exports = function (models) {
    const EventLocation = models.EventLocation;

    return {
        createEventLocation(countryName, city, address, postCode) {
            let eventLocation = new EventLocation({
                countryName,
                city,
                address,
                postCode
            });

            return new Promise((resolve, reject) => {
                eventLocation.save((error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(eventLocation);
                });
            });
        },
        getEventLocationById(id) {
            return new Promise((resolve, reject) => {
                EventLocation.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getEventLocationByName(name) {
            return new Promise((resolve, reject) => {
                EventLocation.findOne({ name: name }, (err, location) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(location);
                });
            });
        },
        getAllEventLocation() {
            return new Promise((resolve, reject) => {
                EventLocation.find((err, locations) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(locations);
                });
            });
        }
    };
};