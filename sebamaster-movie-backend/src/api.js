"use strict";//定义api有哪些接口


const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const movie = require('./routes/movie');
const ticket = require('./routes/ticket');
const attraction = require('./routes/attraction');
const cartOrder = require('./routes/cartOrder');
const comment = require('./routes/comment');



const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'SEBA Master Movie Backend'
    });
});

// API routes
api.use('/auth'  , auth);
api.use('/movies', movie);
api.use('/attraction', attraction);
api.use('/cartOrder'  , cartOrder);
api.use('/comment', comment);
api.use('/ticket'  , ticket);


module.exports = api;