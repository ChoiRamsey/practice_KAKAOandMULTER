const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const homeRouter = require('./homeRouter');
const soccerRouter = require('./soccerRouter');
const imageRouter = require('./imageRouter');

router.use('/auth', userRouter);
router.use('/home', homeRouter);
router.use('/soccer', soccerRouter);
router.use('/image', imageRouter);

module.exports = router;