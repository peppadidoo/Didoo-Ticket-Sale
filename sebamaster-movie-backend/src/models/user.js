"use strict";

const mongoose = require('mongoose');

// Define the user schema

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true//meaning
        // unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true//不能重复，独特
    }
});

UserSchema.set('versionKey', false);//啥意思

// Export the Movie model
module.exports = mongoose.model('User', UserSchema);