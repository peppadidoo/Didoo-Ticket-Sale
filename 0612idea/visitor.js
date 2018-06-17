"use strict";

const mongoose = require('mongoose');
const VisitorSchema = new mongoose.Schema({

    visitorname: {
        type: String,
        required: true,
        unique:true
    },

    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
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
    portrait: String,

});

VisitorSchema.set('versionKey', false);

// Export the Visitor model
module.exports = mongoose.model('Visitor', VisitorSchema);