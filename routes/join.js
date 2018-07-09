const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.js');

const router = express.Router();

router.post('/', (req, res, next) => {
  req.body.isAdmin = false;
  userModel.new(req.body, (err, result) => {
    if (err) return next(err);
    const token = jwt.sign(result.ops[0], 'JWT KEY');
    res.json({ success: true, message: 'Authenticated', token, id: result.insertedId });
  });
});

module.exports = router;
