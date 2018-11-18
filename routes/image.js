const express = require('express');
const multer = require('multer');

const router = express.Router();
const pathToImages = './helpers/ocr/images';
const ocrUtil = require('../helpers/ocr/ocrUtil');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, pathToImages);
  },
  filename: (req, file, callback) => {
    const filename = req.decoded.username;
    // Get everything after . (meaning get file extension) by splitting and taking second half
    const extension = file.originalname.split('.')[1];
    req.body.newFilename = `${filename}.${extension}`;
    callback(null, req.body.newFilename);
  },
});

const upload = multer({ storage });

// update image
router.post('/', upload.single('image'), (req, res, next) => {
  ocrUtil.parseImage(req.body.newFilename, (err, result) => {
    if (err) next(err);
    res.setHeader('content-type', 'text/json');
    res.json({ result });
  });
});

module.exports = router;
