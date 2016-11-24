'use strict';

const connectionString = require('../config/db/constants');

const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;

MongoClient.connect(connectionString)
    .then(() => {

    })
    .catch((error) => {
        console.log(error);
    });