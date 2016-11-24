'use strict';

const config = require('./data');
const app = require('./config/application');
const data = require('./data')(config);

app.start();