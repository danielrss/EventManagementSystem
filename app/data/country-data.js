'use strict';

module.exports = function (models) {
    const Country = models.Country;

    return {
        createCountry(name) {
            let country = new Country({
                name
            });

            return new Promise((resolve, reject) => {
                country.save((error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(country);
                });
            });
        },
        getAllCountries() {
            return new Promise((resolve, reject) => {
                Country.find((err, countries) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(countries);
                });
            });
        },
    };
};