const { imageDao } = require('../models');

const saveImage = async(imageAddress) => {
  return await imageDao.saveImage(imageAddress);
};

const getImage = async() => {
  return await imageDao.getImage();
};

module.exports = {
  saveImage,
  getImage
};