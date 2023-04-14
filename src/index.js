const express = require('express');
const { v4: uuid } = require('uuid');
const { 
  findTalker,
  validateEmail, 
  validatePassword,
} = require('./middleware/validate');
const {
  HTTP_OK_STATUS,
  HTTP_ERROR_STATUS,
  PORT,
  TALKER_JSON,
} = require('./utils/variables');
const { readJson } = require('./utils/fsUtils');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readJson(TALKER_JSON);
    return res.status(HTTP_OK_STATUS).send(talkers || []);
  } catch (err) {
    return res.status(HTTP_ERROR_STATUS).send({ error: err.message });
  }
});

app.get('/talker/:id', findTalker, (_req, res) => {
  try {
    return res.status(HTTP_OK_STATUS).send(res.locals);
  } catch (err) {
    return res.status(HTTP_ERROR_STATUS).send({ error: err.message });
  }
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  try {
    const token = uuid().replace(/-/, '').substring(0, 16);
    return res.status(HTTP_OK_STATUS).send({ token });
  } catch (err) {
    return res.status(HTTP_ERROR_STATUS).send({ error: err.message });
  }
});

app.listen(PORT, () => console.log('Online'));
