"use strict";//java-jvm node.js(environment)-express. express 是后端段框架。学express
//200，400啥意思 http status code 200 ok
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');//需要的库

const config     = require('../config');
const VistorModel  = require('../models/visitor');//啥意思,和return model啥关系

//先回调，然后
const login = (req,res) => {//和数据库交互，请求monggodb拿出来，在express里面看
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'visitorname')) return res.status(400).json({
        error: 'Bad Request',//传回一个json
        message: 'The request body must contain a visitorname property'
    });

    VistorModel.findOne({visitorname: req.body.visitorname}).exec()//UseModel schema
        .then(visitor => {//visitor object

            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, visitor.password);
            if (!isPasswordValid) return res.status(401).send({token: null });

            // if visitor is found and password is valid
            // create a token
            const token = jwt.sign({ id: visitor._id, visitorname: visitor.visitorname }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});

        })
        .catch(error => res.status(404).json({
            error: 'Visitor Not Found',
            message: error.message
        }));

};


const register = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'visitorname')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a visitorname property'
    });//上面是不成功的

    const visitor = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});//please change the password to this way


    VistorModel.create(visitor)
        .then(visitor => {

            // if visitor is registered without errors
            // create a token
            const token = jwt.sign({ id: visitor._id, visitorname: visitor.visitorname }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});


        })
        .catch(error => {
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'Visitor exists',
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
    VistorModel.findById(req.visitorId).select('visitorname').exec()
        .then(visitor => {//then是执行完前面的执行后面

            if (!visitor) return res.status(404).json({
                error: 'Not Found',
                message: `Visitor not found`
            });

            res.status(200).json(visitor)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};

const list  = async (req, res) => {

    const visitors = await VistorModel.find({});
    res.status(200).json(visitors);
};

module.exports = {//export出去再别的地方调用
    login,
    register,
    logout,
    me,
    list
};