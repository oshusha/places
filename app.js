require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/cards', cards);
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

// eslint-disable-next-line no-console
app.listen(process.env.PORT || 3000, () => console.log('server started'));
