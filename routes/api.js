const express = require('express');
const middlewares = require('../middlewares');

const router = express.Router();

router.use('/join', require('./join'));
router.use('/login', require('./login'));

router.use(middlewares.authenticate);

router.use('/user', require('./user'));
router.use('/word', require('./word'));

router.get('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
