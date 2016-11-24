/* globals Buffer */
'use strict';

const validator = require('../utils/validator');

const mongoose = require('../../config/mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: validator.nameValidator
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true
    },
    eventType: {
        _id: Number,
        required: true
    },
    user: {
        _id: Number,
        name: String,
        required: true
    },
    location: {
        _id: Number,
        address: String
    },
    description: {
        type: String,
        required: true,
    },
    dateOfEvent: {
        type: Date,
        required: true
    },
    cover: {
        type: Buffer,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean
    },
    capacity: {
        type: Number,
        required: true,
    },
    status: {
        _id: Number,
        type: String
    }
});

let Event;

mongoose.model('Event', EventSchema);

Event = mongoose.model(Event);

module.exports = Event;