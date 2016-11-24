'use strict';

const mongoose = require('mongoose');

module.exports = function(mongoDbConnectionString) {
    mongoose.connect(mongoDbConnectionString);
};