'use strict';

module.exports = function(app, express, data) {
    let eventRouter = new express.Router(),
        eventController = require('../controllers/event-controller')(data);

    eventRouter
        .get('/events', eventController.getEvents)
        .get('/events/search', eventController.search)
        .get('/events/create', eventController.getCreateEventForm)
        .post('/events/create', eventController.createEvent)
        .get('/events/:id', eventController.getEventDetails)
        .post('/events/:id', eventController.rateEvent);
        .post('/events/:id/images', eventController.uploadImage);

    app.use(eventRouter);
};