const express = require('express');
const wordModel = require('../models/word.js');

const router = express.Router();

// increment
router.post('/', (req, res, next) => {
  wordModel.increment(req.decoded._id, req.body.word, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

// delete
router.delete('/', (req, res, next) => {
  wordModel.delete(req.decoded._id, req.body.word, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
