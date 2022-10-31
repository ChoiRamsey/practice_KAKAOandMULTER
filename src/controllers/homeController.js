const { homeService } = require('../services');
const { catchAsync } = require('../utils/error');

const showHome = catchAsync(async (req, res) => {
  res.render('home');
});

module.exports = {
  showHome
}