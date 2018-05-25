"use strict";//定义一个login，往这个地址发http request才能知道

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');//中间件，收到request处理下，给下一个。例子，查权限
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/logout', AuthController.logout);

module.exports = router;