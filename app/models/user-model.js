'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const letters = /[A-Za-z]/;
const lettersAndNumbers = /[A-Za-z1-9]/;
const passwordCharacters = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

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
    registered: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true,
        match: passwordCharacters
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean
    }
});

mongoose.model('User', UserSchema);

let User = mongoose.model('User');

module.exports = User;