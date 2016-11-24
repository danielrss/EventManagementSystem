'use strict';

const mongoose = require('../../config/db/mongoose');

const Schema = new mongoose.Schema;

let EventTypeSchema = new Schema({
    name: {
        type: String
    }
});



