"use strict";//看mongoose options,

const mongoose = require('mongoose');

// Define the order schema

const CartorderSchema  = new mongoose.Schema({//数据结构

                quantity: {
                    type:Number,
                    required:true
                },
                ticketId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required :true
                },
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                status: {
                    type: String,
                    enum: ['inCart', 'inOrder'],
                    default: 'inCart',
    },

});
CartorderSchema.set('versionKey', false);//啥意思，自动加version
CartorderSchema.set('timestamps', true);//啥意思,自动加时间,creatAt,

// Export the Movie model
module.exports = mongoose.model('CartOrder', CartorderSchema);