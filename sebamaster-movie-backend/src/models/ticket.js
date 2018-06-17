"use strict";//看mongoose options,

const mongoose = require('mongoose');

// Define the ticket schema

const TicketsSchema  = new mongoose.Schema({
    date : {
        type: Date,
        required: true,
    },
    stock: {
        type:Number,
        required:true,
    },
    attractionId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
});


// Export the Ticket model
module.exports = mongoose.model('Ticket', TicketsSchema);

