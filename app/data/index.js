'use strict';

const connectionString = require('../config/db/constants');
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

module.exports = function() {
    let User = require('../models/user-model');
    let EventLocation = require('../models/eventLocation-model');
    let models = { User, EventLocation };
    let data = {};

    fs.readdirSync('../data')
        .filter(x => x.includes("-data"))
        .forEach(file => {
            let dataModule =
                require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};