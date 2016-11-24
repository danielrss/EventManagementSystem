'use strict';

const validate = require('mongoose-validator');

var nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only',
        httpStatus: 400
    })
];
var ageValidator = [
    validate({
        validator: function(val) {
            return val > 0;
        },
        message: 'Age must be a positive number.'
    })
];

module.exports = {
    nameValidator,
    ageValidator
};