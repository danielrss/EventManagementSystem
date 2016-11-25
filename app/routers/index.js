'use strict';

let fs = require('fs'),
    path = require('path');

module.exports = function (app, data) {
    // requiring all router files
    fs.readdirSync('./app/routers')
        .filter(file => file.includes('-router'))
        .forEach(file => require(path.join(__dirname, file))(app, data));
};