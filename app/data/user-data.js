'use strict';

module.exports = function(models) {
    const User = models.User;

    return {
        createUser(firstName, lastName, age, email, password) {
            let user = new User({
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
        getUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByName(name) {
            return new Promise((resolve, reject) => {
                User.findOne({ name: name }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUsersByNames(User, ...names) {
            return new Promise((resolve, reject) => {
                User.find({
                    name: { $in: names }
                }, (err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(users);
                });
            });
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
};