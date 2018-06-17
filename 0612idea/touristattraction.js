"use strict";

const mongoose = require('mongoose');

const TouristattractionSchema = new mongoose.Schema({

    touristattractionname: {
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

TouristattractionSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('Touristattraction', TouristattractionSchema);