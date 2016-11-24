'use strict';

module.exports = {
    development: {
        sessionSecret: '[session_secret',
        connectionString: 'mongodb://localhost:27017/events-db',
        port: 3003
    },
    production: {
        sessionSecret: '[session_secret]',
        connectionString: 'live-con-string',
        port: 3030
    }
};