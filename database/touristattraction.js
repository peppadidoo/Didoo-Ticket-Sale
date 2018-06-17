"use strict";

const mongoose = require('mongoose');

const touristattractionSchema = new mongoose.Schema({

    touristattractionname: {
        type: String,
        required: true
    },
    touristattractionid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    portrait: String,

    lisence: {
        type: String,
        required: true
    }
})

VisitorSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Visitor', VisitorSchema);