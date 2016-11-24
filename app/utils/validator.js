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
        validator: function(value) {
            return value > 0;
        },
        message: 'Age must be a positive number.'
    })
];

var numberValidator = [
    validate({
        validator: function(value) {
            return typeof(value) === 'number';
        },
        message: 'Input is not a number.'
    })
];

module.exports = {
    nameValidator,
    ageValidator,
    numberValidator
};