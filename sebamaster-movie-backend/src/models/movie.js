"use strict";//看mongoose options,

const mongoose = require('mongoose');

// Define the movie schema

const MovieSchema  = new mongoose.Schema({//数据结构

    title: {
        type: String,
        required: true
    },
    synopsis: String,
    runtime: Number,
    mpaa_rating: String,
    year: {
        type: Number,
        required: true
    },
    posters: {
            thumbnail: String,
            profile: String,
            detailed: String,
            original: String
        }
});

MovieSchema.set('versionKey', false);//啥意思，自动加version
MovieSchema.set('timestamps', true);//啥意思,自动加时间,creatAt,

// Export the Movie model
module.exports = mongoose.model('Movie', MovieSchema);