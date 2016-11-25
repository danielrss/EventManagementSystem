'use strict';

const express = require('express');

module.exports = function(app, data) {
    let homeController = require('../controllers/home-controller')();

    let router = new express.Router();

    router
        .get('/', (req, res) => {
            res.redirect('/home');
        })
        .get('/home', homeController.home);

    app.use('/', router);
};