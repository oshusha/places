const router = require('express').Router();
const fsPromises = require('fs').promises;

const cards = fsPromises.readFile('../data/cards.json', { encoding: 'utf8' });

router.get('/', (req, res) => {
  cards.then((data) => {
    res.send(data);
  })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Карточки не могут быть прочитаны. Возникла ошибка: ${err}`);
    });
});

module.exports = router;
