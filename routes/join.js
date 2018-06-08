const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.js');

const router = express.Router();

router.post('/', (req, res, next) => {
  userModel.new(req.body.username, req.body.password, false, (err, result) => {
    if (err) return next(err);
    const token = jwt.sign(result, process.env.JWT_KEY);
    res.json({ success: true, message: 'Authenticated', token });
  });
});

module.exports = router;
