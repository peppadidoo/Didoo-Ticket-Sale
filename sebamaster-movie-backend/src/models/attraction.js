"use strict";//看mongoose options,

const mongoose = require('mongoose');
// Define the attraction schema

const AttractionSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: String,
    address : String,
    rating : Number,
    introduction: String,
    district: String,
    price: {
        type: Number,
        required: true
    },
    openTime: String,
    posters: {
        original: String,
        detailed: String
    },
    status: {
        type: String,
        enum: ['waitapproved', 'hasapproved'],
        default: 'waitapproved'
    }

});

AttractionSchema.set('versionKey', false);//啥意思，自动加version
AttractionSchema.set('timestamps', true);//啥意思,自动加时间,creatAt,

// Export the attraction model
module.exports = mongoose.model('attraction', AttractionSchema);