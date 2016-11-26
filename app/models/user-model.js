'use strict';

const mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

const letters = /[A-Za-z]/;
const lettersAndNumbers = /[A-Za-z1-9]/;
//const passwordCharacters = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

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
        min: [12, 'Age must be bigger than 12!']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
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



UserSchema.methods = {
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword: function (password) {
        if(!password) return '';
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