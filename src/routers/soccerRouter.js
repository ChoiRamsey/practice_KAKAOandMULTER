const express = require('express');
const { soccerController } = require('../controllers');
const { loginRequired } = require('../utils/auth')

const router = express.Router();

router.get('', loginRequired, soccerController.getSoccerNews);

module.exports = router;