'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let EventTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

mongoose.model('EventType', EventTypeSchema);

let EventType = mongoose.model('EventType');

module.exports = EventType;