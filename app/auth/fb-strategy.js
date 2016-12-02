'use strict';

const FacebookStrategy = require('passport-facebook');

const FACEBOOK = {
    FACEBOOK_APP_ID: '642427575960501',
    FACEBOOK_APP_SECRET: '56633358aab9094a4a0bc08b641da7b8',
    callbackURL: 'http://localhost:3003/login/facebook/callback'
};

module.exports = function(passport, data) {
    const authStrategy = new FacebookStrategy({
        clientID: FACEBOOK.FACEBOOK_APP_ID,
        clientSecret: FACEBOOK.FACEBOOK_APP_SECRET,
        callbackURL: FACEBOOK.callbackURL
    }, function(token, refreshToken, profile, done) {
        console.log(profile);
        data
            .getUserByFacebookId(profile.id)
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
                        facebookId: profile.id
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