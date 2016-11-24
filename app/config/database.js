'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function(config) {

    mongoose.connect(config.connectionString);
};