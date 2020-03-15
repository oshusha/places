const fs = require('promise-fs');
const express = require('express');

const router = express.Router();

/* GET users listing. */
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');


router.get('/', (req, res) => {
  fs.readFile(usersPath)
    .then((data) => res.json(JSON.parse(data)))
    .catch((err) => res.status(500).json({ message: err.message }));
});


router.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile(usersPath, 'utf8');
    const user = JSON.parse(data)
      // eslint-disable-next-line array-callback-return,consistent-return
      .find((dataUser) => {
        // eslint-disable-next-line no-underscore-dangle
        if (dataUser._id === req.params.id) {
          return dataUser;
        }
      });
    if (user) {
      res.json({ data: user });
    } else {
      res.status(404)
        .json({ message: 'Пользователь не найден' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
