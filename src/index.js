const express = require('express');
require('express-async-errors');
const { v4: uuid } = require('uuid');

// Utilitários
const { readJson } = require('./utils/fsUtils');
const {
  HTTP_OK_STATUS,
  HTTP_ERROR_STATUS,
  PORT,
  TALKER_JSON,
} = require('./utils/variables');

// Middlewares
const { 
  findTalker,
  validateEmail, 
  validatePassword,
} = require('./middlewares/validate');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// GET /talker
app.get('/talker', async (_req, res) => {
    const talkers = await readJson(TALKER_JSON);
    return res.status(HTTP_OK_STATUS).send(talkers || []);
});

// GET /talker/id
app.get('/talker/:id', findTalker, (_req, res) => {
    return res.status(HTTP_OK_STATUS).send(res.locals);
});

// POST /login
app.post('/login', validateEmail, validatePassword, (_req, res) => {
    const token = uuid().replace(/-/, '').substring(0, 16);
    return res.status(HTTP_OK_STATUS).send({ token });
});

// Middlewares de erro
app.use((err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(HTTP_ERROR_STATUS).send({ error: err.message });
});

app.listen(PORT, () => console.log('Online'));
