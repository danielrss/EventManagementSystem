'use strict';

const FacebookStrategy = require('passport-facebook');

const FACEBOOK = {
    FACEBOOK_APP_ID: '195856980819347',
    FACEBOOK_APP_SECRET: '2f9867ce3959a93743b8c1c1a40caad4',
    callbackURL: 'http://localhost:3003/login/facebook/callback'
};

module.exports = function(passport, data) {
    const authStrategy = new FacebookStrategy({
            clientID: FACEBOOK.FACEBOOK_APP_ID,
            clientSecret: FACEBOOK.FACEBOOK_APP_SECRET,
            callbackURL: FACEBOOK.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            data
                .getUserByName(profile.username)
                .then(user => {
                    if (user) {
                        return user;
                    } else {
                        return data.createUser({
                            username: profile.username,
                            email: profile.email
                        });
                    }
                })
                .then(user => {
                    done(null, user);
                })
                .catch(error => done(error, false));
        }
    );

    passport.use(authStrategy);
};