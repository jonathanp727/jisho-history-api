const express = require('express');
const wordModel = require('../models/word.js');

const router = express.Router();

// increment
router.post('/', (req, res, next) => {
  wordModel.increment(req.decoded.id, req.body.word, (err, result) => {
    if (err) return next(err);
    res.json(result.insertedId);
  });
});

// delete
router.delete('/:word', (req, res, next) => {
  wordModel.delete(req.decoded.id, req.params.word, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
