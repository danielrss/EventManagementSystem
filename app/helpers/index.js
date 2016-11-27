'use strict';

const util = require('util');

let helpers = {};

helpers.errorHelper = function (err) {
    let errors = [],
        messages = {
            'required': '%s is required.',
            'min': '%s below minimum.',
            'max': '%s above maximum.',
            'enum': '%s not an allowed value.'
        };

    if (err.name !== 'ValidationError') {
        return err;
    }

    Object.keys(err.errors).forEach(function (field) {
        let eObj = err.errors[field];

        if (!messages.hasOwnProperty(eObj.properties.type)) {
            errors.push(eObj.properties.type);
        } else {
            errors.push(util.format(
                messages[eObj.properties.type],
                eObj.properties.path)
            );
        }
    });

    return errors;
};

module.exports = helpers;
