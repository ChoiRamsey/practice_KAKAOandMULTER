const express = require('express');
const { imageController } = require('../controllers');
const router = express.Router();
const { upload } = require('../utils/multer');

// router.post('/upload', upload.single('attachedFile'), function (req, res, next) {
//   res.render('uploadResult', { file: req.file, files: null});
// });

router.post('/upload', upload.single('attachedFile'), imageController.saveImage);
router.get('', imageController.getImage);

module.exports = router;