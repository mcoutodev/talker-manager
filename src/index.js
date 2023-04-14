const express = require('express');
const {
  HTTP_OK_STATUS,
  HTTP_ERROR_STATUS,
  HTTP_NOT_FOUND,
  PORT,
} = require('./utils/variables');
const readJson = require('./utils/fs/readJson');

const app = express();
app.use(express.json());

const talkerJson = './src/talker.json';

const findTalker = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readJson(talkerJson);
  const talkerFound = talkers.find((talker) => talker.id === Number(id));
  
  if (!talkerFound) {
    return res.status(HTTP_NOT_FOUND).send({ 
      message: 'Pessoa palestrante não encontrada', 
    });
  }
  res.locals = talkerFound;
  next();
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readJson(talkerJson);
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

app.listen(PORT, () => {
  console.log('Online');
});
