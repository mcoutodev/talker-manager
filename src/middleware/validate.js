const { 
  HTTP_NOT_FOUND, 
  HTTP_BAD_REQUEST, 
  TALKER_JSON,
} = require('../utils/variables');
const { readJson } = require('../utils/fsUtils');

const findTalker = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readJson(TALKER_JSON);
  const talkerFound = talkers.find((talker) => talker.id === Number(id));
  
  if (!talkerFound) {
    return res.status(HTTP_NOT_FOUND)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }
  res.locals = talkerFound;
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!email) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = { findTalker, validateEmail, validatePassword };
