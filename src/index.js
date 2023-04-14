const express = require('express');
const {
  HTTP_OK_STATUS,
  HTTP_ERROR_STATUS,
  PORT,
} = require('./utils/variables');
const readJson = require('./utils/fs/readJson');

const app = express();
app.use(express.json());

const talkerJson = './src/talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const data = await readJson(talkerJson);
    return res.status(HTTP_OK_STATUS).send(data || []);
  } catch (err) {
    return res.status(HTTP_ERROR_STATUS);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
