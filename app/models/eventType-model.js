'use strict';

const validator = require('../utils/validator');

const mongoose = require('../../config/mongoose');
const Schema = mongoose.Schema;

let EventTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

let EventType;

mongoose.model('EventType', EventTypeSchema);

EventType = mongoose.model(EventType);

module.exports = EventType;