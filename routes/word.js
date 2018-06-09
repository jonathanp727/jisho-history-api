const express = require('express');
const wordModel = require('../models/word.js');

const router = express.Router();

// increment
router.post('/:id', (req, res, next) => {
  wordModel.increment(req.params.id, req.body.word, (err, result) => {
    if (err) return next(err);
    res.json(result.insertedId);
  });
});

// delete
router.delete('/:id/:word', (req, res, next) => {
  wordModel.delete(req.params.id, req.params.word, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

module.exports = router;
