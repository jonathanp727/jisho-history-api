const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.js');

const router = express.Router();

router.post('/', (req, res, next) => {
  req.body.isAdmin = false;
  userModel.new(req.body, (err, result) => {
    if (err) return next(err);
    // Create userData object that doesn't contain data for words
    // This keeps jwt tokens from being infinitely large
    const { words, ...userData } = result.ops[0];
    const token = jwt.sign(userData, 'JWT KEY');
    res.json({ success: true, message: 'Authenticated', token, id: result.insertedId });
  });
});

module.exports = router;
