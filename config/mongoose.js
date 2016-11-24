'use strict';

const mongoose = require('mongoose');

module.exports = function(mongoDbConnectionString) {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoDbConnectionString);
};