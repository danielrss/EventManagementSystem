'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let EventTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

let EventType;

mongoose.model('EventType', EventTypeSchema);

EventType = mongoose.model('EventType');

module.exports = EventType;