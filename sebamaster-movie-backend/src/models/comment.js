"use strict";//看mongoose options,

const mongoose = require('mongoose');
// Define the Comment schema

const CommentSchema  = new mongoose.Schema({//数据结构

    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        required :true
    },
    attractionId: {
        type: mongoose.Schema.Types.ObjectId,
        required :true
    },
    context: {
        type:String,
        required:true,
    }

});
CommentSchema.set('versionKey', false);//啥意思，自动加version
CommentSchema.set('timestamps', true);//啥意思,自动加时间,creatAt,

// Export the Comment model
module.exports = mongoose.model('Comment', CommentSchema);