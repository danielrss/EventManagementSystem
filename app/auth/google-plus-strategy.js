'use strict';

const GooglePlusStrategy = require('passport-google-plus');

const GOOGLEPLUS = {
    GOOGLE_APP_ID: '42643689062-kmm89boegmnl0bhe4td16fdctlgbl77b.apps.googleusercontent.com',
    GOOGLE_APP_SECRET: 'n_KJIx9wlxyDwlFPIiGt837x'
};

module.exports = function(passport, data) {
    const authStrategy = new GooglePlusStrategy({
        clientID: GOOGLEPLUS.GOOGLE_APP_ID,
        clientSecret: GOOGLEPLUS.GOOGLE_APP_SECRET
    }, function(token, refreshToken, profile, done) {
        console.log(profile);
        data
            .getUserByGoogleplusId(profile.id)
            .then(user => {
                if (user) {
                    return user;
                } else {
                    return data.createUser({
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        username: profile.username,
                        age: profile.age,
                        email: profile.email,
                        googleplusId: profile.id
                    });
                }
            })
            .then(user => {
                done(null, user);
            })
            .catch(error => done(error, false));
        done(null, profile, token);
    });
    passport.use(authStrategy);
};