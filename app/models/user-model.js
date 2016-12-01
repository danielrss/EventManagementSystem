'use strict';

const mongoose = require('mongoose'),
    crypto = require('crypto'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

const letters = /[A-Za-z]/,
    lettersAndNumbers = /[A-Za-z1-9]/,
    emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short!'],
        maxlength: [50, 'Name is too long!'],
        match: letters
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short!'],
        maxlength: [50, 'Name is too long!'],
        match: letters
    },
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        minlength: [3, 'Name is too short!'],
        maxlength: [50, 'Name is too long!'],
        match: lettersAndNumbers
    },
    age: {
        type: Number,
        required: true,
        min: [12, 'Age must be at least 12!']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        match: emailPattern
    },
    avatarUrl: {
        type: String,
        default: '/static/uploads/users/avatar.jpg'
    },
    salt: String,
    passwordHash: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean
    },
    role: {
        type: String,
        default: 'user'
    }
});

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.passwordHash = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.plugin(uniqueValidator);

UserSchema.methods = {
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword: function (password) {
        if(!password) {
            return '';
        }

        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    authenticatePassword: function (password) {
        return this.encryptPassword(password) === this.passwordHash;
    }
};

mongoose.model('User', UserSchema);
let User = mongoose.model('User');
module.exports = User;