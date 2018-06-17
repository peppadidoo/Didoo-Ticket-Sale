"use strict";//定义一个login，往这个地址发http request才能知道

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');//中间件，收到request处理下，给下一个。例子，查权限
const VisitorController = require('../controllers/visitor');


router.post('/login', VisitorController.login);//which function will be called when
router.post('/register', VisitorController.register);
router.get('/me', middlewares.checkAuthentication , VisitorController.me);//先call第一个，然后call第二个
router.get('/logout', VisitorController.logout);
router.get('/', VisitorController.list);

module.exports = router;