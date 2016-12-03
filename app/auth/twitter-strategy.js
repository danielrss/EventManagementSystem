// 'use strict';

// const TwitterStrategy = require('passport-twitter').Strategy;

// const TWITTER = {
//     TWITTER_APP_ID: 'IYE49wNa4MZgmMvApw0Oulj30',
//     TWITTER_APP_SECRET: 'gzazRHBZPtIaCBkqWnQZYwb5fCPTKnaDSYu29t02mG3HItRVcq',
//     callbackURL: 'http://localhost:3003/auth/twitter/callback'
// };


// module.exports = function(passport, data) {

//     const TwitterAuthStrategy = new TwitterStrategy({
//         clientID: TWITTER.TWITTER_APP_ID,
//         clientSecret: TWITTER.TWITTER_APP_SECRET,
//         callbackURL: TWITTER.callbackURL,
//         profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
//         passReqToCallback: true
//     }, (req, accessToken, refreshToken, profile, done) => {
//         process.nextTick(function() {
//             data
//                 .getUserByTwitterId(profile.id)
//                 .then(user => {
//                     if (user) {
//                         return done(null, user);
//                     } else {
//                         data.createUser({
//                             firstName: profile.name.givenName,
//                             lastName: profile.name.familyName,
//                             email: profile.emails[0].value,
//                             username: profile.name.givenName + '' + profile.name.familyName,
//                             //avatarUrl: `https://graph.facebook.com/${profile.id}/picture?type=large`,
//                             socialLogins: {
//                                 facebook: {
//                                     email: profile.emails[0].value,
//                                     id: profile.id,
//                                     token: accessToken,
//                                     name: profile.name.givenName + ' ' + profile.name.familyName,
//                                     //picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
//                                 }
//                             }
//                         }).then(user => {
//                             return done(null, user);
//                         });
//                     }
//                 });
//         });
//     });

//     passport.use(TwitterAuthStrategy);
// };