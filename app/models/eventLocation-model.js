'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const letters = /[A-Za-z]/;

let EventLocationSchema = new Schema({
    countryName: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short!'],
        maxlength: [50, 'Name is too long!'],
        match: letters
    },
    city: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short!'],
        maxlength: [50, 'Name is too long!'],
        match: letters
    },
    address: {
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        required: true
    }
});

mongoose.model('EventLocation', EventLocationSchema);

let EventLocation = mongoose.model('EventLocation');

module.exports = EventLocation;