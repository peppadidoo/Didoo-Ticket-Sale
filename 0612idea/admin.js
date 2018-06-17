"use strict";

const mongoose = require('mongoose');

// Define the user schema

const AdminSchema  = new mongoose.Schema({
    adminname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    avatar: {
        type: String,
        required: true
    }
});

AdminSchema.set('versionKey', false);

// Export the Admin model
module.exports = mongoose.model('Admin', AdminSchema);