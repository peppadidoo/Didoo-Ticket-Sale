"use strict";

const mongoose = require('mongoose');

// Define the user schema

const UserSchema  = new mongoose.Schema({
    username: {
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
    sex: String,
    phone: String,
    adress: String,
    portrait: String,
    status: {
        type: String,
        enum: ['visitor', 'admin', 'attractionadmin'],
        default:  'visitor',
    },
});

UserSchema.set('versionKey', false);//啥意思

// Export the Movie model
module.exports = mongoose.model('User', UserSchema);