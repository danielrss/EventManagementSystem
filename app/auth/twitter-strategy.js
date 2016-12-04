'use strict';

const TwitterStrategy = require('passport-twitter').Strategy;

const TWITTER = {
    TWITTER_APP_ID: 'IYE49wNa4MZgmMvApw0Oulj30',
    TWITTER_APP_SECRET: 'gzazRHBZPtIaCBkqWnQZYwb5fCPTKnaDSYu29t02mG3HItRVcq',
    callbackURL: 'http://localhost:3003/auth/twitter/callback'
};
module.exports = function(passport, data) {

    const TwitterAuthStrategy = new TwitterStrategy({
        consumerKey: TWITTER.TWITTER_APP_ID,
        consumerSecret: TWITTER.TWITTER_APP_SECRET,
        callbackURL: TWITTER.callbackURL,
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {
        process.nextTick(function() {
            data
                .getUserByTwitterId(profile.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    } else {
                        data.createUser({
                            firstName: profile.username.split(/(?=[A-Z])/)[0],
                            lastName: profile.username.split(/(?=[A-Z])/)[1],
                            email: profile.displayName + '@twitter.com',
                            username: profile.username + '' + profile.id,
                            avatarUrl: profile.photos[0].value,
                            socialLogins: {
                                twitter: {
                                    email: profile.displayName + '@twitter.com',
                                    id: profile.id,
                                    token: accessToken,
                                    name: profile.username,
                                    picture: profile.photos[0].value,
                                }
                            }
                        }).then(user => {
                            return done(null, user);
                        });
                    }
                });
        });
    });

    passport.use(TwitterAuthStrategy);
};