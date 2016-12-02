'use strict';
let connectionStrings = {
    production: process.env.CONNECTION_STRING,
    development: 'mongodb://localhost/events-db'
};

module.exports = {
    environment: process.env.NODE_ENV || 'evelopment',
    connectionString: connectionStrings[process.env.NODE_ENV || 'development'],
    port: process.env.PORT || 3003,
    sessionSecret: process.env.SESSION_SECRET || '[session_secret]'
};