'use strict';

module.exports = function(app, express, data) {
    let eventRouter = new express.Router(),
        eventController = require('../controllers/event-controller')(data);

    eventRouter
        .get('/events', eventController.getEvents)
        .get('/events/search', eventController.search)
        .get('/events/create', eventController.getCreateEventForm)
        .get('/events/:id', eventController.getEventDetails)
        .post('/events', eventController.createEvent);

    app.use(eventRouter);
};