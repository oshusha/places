const router = require('express').Router();
const fsPromises = require('fs').promises;

const users = fsPromises.readFile('../data/users.json', { encoding: 'utf8' });

router.get('/', (req, res) => {
  users.then((data) => {
    res.send(data);
  })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Данные пользователей не могут быть прочитаны. Возникла ошибка: ${err}`);
    });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const userIsFind = users.find(user => user._id === userId);

  users.then((data) => {
    if (userIsFind) {
      res.send(userIsFind);
    }
  })
    .catch((err) => {
      res.status(404).send({ message: `Нет пользователя с таким id'. Возникла ошибка: ${err}` });
    });
});

module.exports = router;
