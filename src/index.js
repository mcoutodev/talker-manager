const express = require('express');
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
const { readJson }= require('./utils/fsUtils');

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
    return res.status(HTTP_ERROR_STATUS);
  }
});

app.get('/talker/:id', findTalker, (_req, res) => {
  try {
    return res.status(HTTP_OK_STATUS).send(res.locals);
  } catch (err) {
    return res.status(HTTP_ERROR_STATUS);
  }
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  try {
    const token = `${Math.random().toString(16).substring(2)}uid`;
    return res.status(HTTP_OK_STATUS).send({ token });
  } catch (err) {
    return res.status(HTTP_ERROR_STATUS);
  }
});

app.listen(PORT, () => console.log('Online'));
