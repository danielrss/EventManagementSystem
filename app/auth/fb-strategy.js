'use strict';

const FacebookStrategy = require('passport-facebook'),
    User = require('../models/user-model');

const FACEBOOK = {
    FACEBOOK_APP_ID: '1378891302134747',
    FACEBOOK_APP_SECRET: '04bed716742c12ed3b994952507323bf',
    callbackURL: 'http://localhost:3003/auth/facebook/callback'
};

module.exports = function(passport, data) {

    const FacebookAuthStrategy = new FacebookStrategy({
        clientID: FACEBOOK.FACEBOOK_APP_ID,
        clientSecret: FACEBOOK.FACEBOOK_APP_SECRET,
        callbackURL: FACEBOOK.callbackURL,
        profileFields: ["name", "email", "link", "locale", "timezone"],
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        
        process.nextTick(function() {
            User.findOne({ 'socialLogins.facebook.id' : profile.id }, function(err, user) {

                if (err){
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User();

                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.email = profile.emails[0].value;
                    newUser.username = profile.name.givenName + '' + profile.name.familyName + '' + profile.id;
                    newUser.avatarUrl = `https://graph.facebook.com/${profile.id}/picture?type=large`;

                    newUser.socialLogins.facebook.email = profile.emails[0].value;
                    newUser.socialLogins.facebook.id    = profile.id;
                    newUser.socialLogins.facebook.token = accessToken;
                    newUser.socialLogins.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.socialLogins.facebook.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;

                    newUser.save(function(err) {
                        if (err){
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    });

    passport.use(FacebookAuthStrategy);
};