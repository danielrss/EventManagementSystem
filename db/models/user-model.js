'use strict';

const validator = require('../validator');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        validate: validator.nameValidator
    },
    lastName: {
        type: String,
        required: true,
        validate: validator.nameValidator
    },
    username: {
        type: String,
        validate: validator.nameValidator        
    },
    age: {
        type: Number,
        min: 16,
        required: true,
        validate: validator.ageValidator
    },
    registered: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean
    }
});

let User;

mongoose.model('User', UserSchema);

User = mongoose.model(User);

module.exports = User;