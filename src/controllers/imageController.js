const { imageService } = require('../services');
const { catchAsync } = require('../utils/error');

const saveImage = catchAsync(async(req, res) => {
  const imageAddress = req.file.location;

  await imageService.saveImage(imageAddress)
  res.status(201).json({ message : "IMAGE_SAVED!" });
  // res.render('uploadResult', { file: req.file, files: null})
});

const getImage = catchAsync(async(req, res) => {
  const image = await imageService.getImage();
  return res.status(200).json({ image });
})

module.exports = {
  saveImage,
  getImage
}