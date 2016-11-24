'use strict';

const fs = require("fs");
const path = require("path");

module.exports = function() {
    //mongoose();

    let User = require('../models/user-model');
    let EventLocation = require('../models/eventLocation-model');
    let Event = require('../models/event-model');
    let EventType = require('../models/eventType-model');

    let models = { User, Event, EventType, EventLocation };
    let data = {};

    fs.readdirSync('./')
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