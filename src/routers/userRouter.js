const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

// for login
router.get('/kakao/start', userController.reqAuthCode);

// for redirect (NOT for connecting directly)
router.get('/kakao/finish', userController.getKakaoToken);

// for logout (NOT for connecting directly)
router.get('/kakao/end', userController.logoutKakao);

module.exports = router;