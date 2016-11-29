'use strict';

const mongoose = require('mongoose');

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);
};

