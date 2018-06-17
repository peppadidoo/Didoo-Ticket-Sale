"use strict";//定义一个login，往这个地址发http request才能知道

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');//中间件，收到request处理下，给下一个。例子，查权限
const AdminController = require('../controllers/admin');


router.post('/login', AdminController.login);//which function will be called when
router.post('/register', AdminController.register);
router.get('/me', middlewares.checkAuthentication , AdminController.me);//先call第一个，然后call第二个
router.get('/logout', AdminController.logout);

module.exports = router;