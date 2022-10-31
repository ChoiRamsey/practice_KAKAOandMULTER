const { catchAsync } = require('../utils/error');

const getSoccerNews = catchAsync(async (req, res) => {
  res.redirect('https://sports.daum.net/worldsoccer');
});

module.exports = {
  getSoccerNews
}