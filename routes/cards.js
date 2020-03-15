const fs = require('promise-fs');
const express = require('express');

const router = express.Router();

const path = require('path');

const cardsPath = path.join(__dirname, '../data/cards.json');


router.get('/', (req, res) => {
  fs.readFile(cardsPath).then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ error: err.message }));
});


module.exports = router;
