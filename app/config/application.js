'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const express = require('express');
const bodyParser = require('body-parser');

/* Setup App */
let app = express();

app.set('view-engine', 'pug');
app.use(express.static('../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.start = function() {
    let port = config.port;

    app.listen(port, () => console.log(`App running at http://localhost:${port}`));
};

module.exports = app;

