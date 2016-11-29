'use strict';

module.exports = function(app, express, data) {
<<<<<<< HEAD
    let eventRouter = new express.Router(),
        eventController = require('../controllers/event-controller')(data);

    eventRouter
        .get('/events', eventController.getEvents)
        .post('/events', eventController.createEvent)
        .get('/events/:id', eventController.getEventDetails)
        .get('/events', eventController.getSpecificEvents)
        .get('/events', eventController.getEvents);

    app.use(eventRouter);
=======
    let eventController = require('../controllers/event-controller')(data);

    let router = new express.Router();

    router
        .get('/', (req, res) => {
            res.redirect('/home');
        })
        .get('/events', eventController.getAll);

    app.use('/', router);
>>>>>>> bf04e2d23568bf05d36d81599633390ad0d509a4
};