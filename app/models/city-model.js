'use strict';

const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema,
    letters = /[A-Za-z]/;

let CitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        minlength: [3, 'Name is too short!'],
        maxlength: [30, 'Name is too long!'],
        match: letters
    }
});

CitySchema.plugin(uniqueValidator);

mongoose.model('City', CitySchema);
let City = mongoose.model('City');
module.exports = City;