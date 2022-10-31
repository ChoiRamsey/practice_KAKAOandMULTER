const express = require('express');
const { homeController } = require('../controllers');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage : storage });

router.get('', homeController.showHome);
router.post('/upload', upload.single('attachedFile'), function (req, res, next) {
  res.render('uploadResult', { file: req.file, files: null});
});

module.exports = router;