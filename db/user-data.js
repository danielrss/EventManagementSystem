'use strict';

const User = require('./models/user-model');

module.exports = {
    createUser(firstName, lastName, age, email, password) {
        var user = new User({
            firstName,
            lastName,
            age,
            email,
            password
        });

        return new Promise((resolve, reject) => {
            user.save((error) => {
                if (error) {
                    return reject(error);
                }
                return resolve(user);
            });
        });
    },
    getUser() {

    },
    insertManyUsers(users) {
        User.insertMany(users);
    },
    getAllUsers() {
        return new Promise((resolve, reject) => {
            User.find((err, users) => {
                if (err) {
                    return reject(err);
                }
                return resolve(users);
            });
        });
    }
};