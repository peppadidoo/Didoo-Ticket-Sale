"use strict";//定义一个login，往这个地址发http request才能知道

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');//中间件，收到request处理下，给下一个。例子，查权限
const TouristattractionController = require('../controllers/touristattraction');


router.post('/login', TouristattractionController.login);//which function will be called when
router.post('/register', TouristattractionController.register);
router.get('/me', middlewares.checkAuthentication , TouristattractionController.me);//先call第一个，然后call第二个
router.get('/logout', TouristattractionController.logout);

module.exports = router;