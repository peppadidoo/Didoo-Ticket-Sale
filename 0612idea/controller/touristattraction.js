"use strict";//java-jvm node.js(environment)-express. express 是后端段框架。学express
//200，400啥意思 http status code 200 ok
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');//需要的库

const config     = require('../config');
const TouristattrationModel  = require('../models/touristattraction');//啥意思,和return model啥关系

//先回调，然后
const login = (req,res) => {//和数据库交互，请求monggodb拿出来，在express里面看
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'touristattractionname')) return res.status(400).json({
        error: 'Bad Request',//传回一个json
        message: 'The request body must contain a touristattractionname property'
    });

    TouristattrationModel.findOne({touristattractionname: req.body.touristattractionname}).exec()//UseModel schema
        .then(touristattraction => {//touristattraction object

            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, touristattraction.password);
            if (!isPasswordValid) return res.status(401).send({token: null });

            // if touristattraction is found and password is valid
            // create a token
            const token = jwt.sign({ id: touristattraction._id, touristattractionname: touristattraction.touristattractionname }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});

        })
        .catch(error => res.status(404).json({
            error: 'Touristattraction Not Found',
            message: error.message
        }));

};


const register = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'touristattractionname')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a touristattractionname property'
    });//上面是不成功的

    const touristattraction = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});//please change the password to this way


    TouristattrationModel.create(touristattraction)
        .then(touristattraction => {

            // if touristattraction is registered without errors
            // create a token
            const token = jwt.sign({ id: touristattraction._id, touristattractionname: touristattraction.touristattractionname }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});


        })
        .catch(error => {
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'Touristattraction exists',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};


const me = (req, res) => {
    TouristattrationModel.findById(req.touristattractionId).select('touristattractionname').exec()
        .then(touristattraction => {//then是执行完前面的执行后面

            if (!touristattraction) return res.status(404).json({
                error: 'Not Found',
                message: `Touristattraction not found`
            });

            res.status(200).json(touristattraction)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};


module.exports = {//export出去再别的地方调用
    login,
    register,
    logout,
    me
};