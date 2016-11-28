'use strict';

const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema;

let EventTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    }
});

EventTypeSchema.plugin(uniqueValidator);

mongoose.model('EventType', EventTypeSchema);
let EventType = mongoose.model('EventType');
module.exports = EventType;