const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const homeRouter = require('./homeRouter');
const soccerRouter = require('./soccerRouter');

router.use('/auth', userRouter);
router.use('/home', homeRouter);
router.use('/soccer', soccerRouter);

module.exports = router;