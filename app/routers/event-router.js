'use strict';

module.exports = function(app, express, data) {
    let eventRouter = new express.Router(),
        eventController = require('../controllers/event-controller')(data);

    eventRouter
        .get('/events', eventController.getEvents)
        .post('/events', eventController.createEvent)
        .get('/events/:id', eventController.getEventDetails)
        .get('/events', eventController.getSpecificEvents)
        .get('/events', eventController.getEvents)
        .get('/events/search', eventController.search);

    app.use(eventRouter);
};