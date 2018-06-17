"use strict";

const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({

    visitorname: {
        type: String,
        required: true
    },
    visitorid: {
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
    }
    phone: String,
    sex: {
        type: String,
        required: true
    },
    idcard: {
        type: String,
        required: true
    },
    adress: String,
});

VisitorSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Visitor', VisitorSchema);