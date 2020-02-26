const express = require('express');
const router = express.Router();
const cards = require('../data/cards.json')

router.get('/', function(req, res,next)   {
  res.json(cards);
});

module.exports = router;
