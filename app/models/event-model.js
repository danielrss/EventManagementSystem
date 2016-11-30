/* globals Buffer */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const letters = /[A-Za-z]/;

let EventSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name is too short!'],
        maxlength: [50, 'Name is too long!'],
        match: letters
    },
    createdOn: {
        type: Date,
        default: Date.now,
        //required: true
    },
    eventType: {
        // type:String,
        // _id: Number,
        // required: true
    },
    user: {
        type: String,
        _id: Number,
        name: String,
        //required: true
    },
    location: {
        type: String,
        _id: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateOfEvent: {
        type: Date,
        required: true
    },
    coverUrl: {
        type: String,
        //required: true
    },
    rating: {
        type: Number,
        //required: true
    },
    isDeleted: {
        type: Boolean
    },
    isApproved:{
        type: Boolean,
        default: false
    },
    capacity: {
        type: Number,
        required: true
    },
    isIncoming: {
        type: Boolean
    }
});

mongoose.model('Event', EventSchema);
let Event = mongoose.model('Event');
module.exports = Event;