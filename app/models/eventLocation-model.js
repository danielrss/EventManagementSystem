'use strict';

const validator = require('../utils/validator');

const mongoose = require('../../config/mongoose');
const Schema = mongoose.Schema;

let EventLocationSchema = new Schema({
    countryName: {
        type: String,
        required: true,
        validate: validator.nameValidator
    },
    city: {
        type: String,
        required: true,
        validate: validator.nameValidator
    },
    address: {
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        required: true,
        validate: validator.numberValidator
    }
});

let EventLocation;

mongoose.model('EventLocation', EventLocationSchema);

EventLocation = mongoose.model(EventLocation);

module.exports = EventLocation;