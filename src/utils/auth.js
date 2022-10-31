const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const { catchAsync } = require('./error');

const loginRequired = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization
console.log(accessToken, 111)
  if (!accessToken) {
    const error = new Error('LOGIN_REQUIRED!');
    error.statusCode = 401;

    return next(error);
  }

  const payload = await jwt.verify(accessToken, process.env.JWT_SECRET);
console.log(payload, 222)
  const user = await userService.getUserByKakaoId(payload.id);
console.log(user, 333)
  if (!user) {
    const error = new Error('USER_NOT_FOUND');
    error.statusCode = 404;

    return next(error);
  }
  
  req.user = user;
  return next();
});

module.exports = {
  loginRequired
}