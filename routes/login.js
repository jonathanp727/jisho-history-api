const jwt = require('jsonwebtoken');
const express = require('express');

const mongoUtil = require('../helpers/mongoUtil.js');
const cryptoUtil = require('../helpers/cryptoUtil.js');

const router = express.Router();

router.post('/', (req, res, next) => {
  mongoUtil.getDb().collection('users').findOne({ username: req.body.username }, (err, user) => {
    if (err) return next(err);

    if (!user) {
      const error = new Error('Authentication failed. User not found.');
      error.status = 401;
      return next(error);
    } else if (user) {
      const result = cryptoUtil.getHashFromSalt(req.body.password, user.salt);
      if (user.password !== result) {
        const error = new Error('Authentication failed. User not found.');
        error.status = 401;
        return next(error);
      }
      // Create userData object that doesn't contain data for words
      // This keeps jwt tokens from being infinitely large
      const { words, ...userData } = user;
      const token = jwt.sign(userData, 'JWT KEY');
      res.json({ success: true, message: 'Authenticated', token, user });
    }
  });
});

module.exports = router;
