'use strict';

module.exports = function(app, express, data) {
    let eventController = require('../controllers/event-controller')(data);

    let router = new express.Router();

    router
        .get('/', (req, res) => {
            res.redirect('/home');
        })
        .get('/events', eventController.getAll);

    app.use('/', router);
};