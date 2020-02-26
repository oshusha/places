const express = require('express');
const router = express.Router();
const users = require('../data/users.json')
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  // eslint-disable-next-line no-underscore-dangle
  const isFind = users.find(user => user._id === id);

  if (isFind) {
    return res.json(isFind);
  }

  return res.status(404).json({ message: 'Нет пользователя с таким id' });
});


module.exports = router;
