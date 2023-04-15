const { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } = require('../utils/variables');

// Verifica se um email é válido
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

// Verifica se uma senha é válida
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

// Valida o token enviado no cabeçalho
const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED).send({ 
      message: 'Token não encontrado',
    });
  }
  if (typeof authorization !== 'string' || authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).send({ message: 'Token inválido' });
  }
  next();
};

// Verifica o corpo da requisição da pessoa palestrante
const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || Number(age) < 18) {
    return res.status(HTTP_BAD_REQUEST).send({ 
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateRegex = (
    /^(0[1-9]|[12]\d|3[01])[\/\-\.](0[1-9]|1[0-2])[\/](19|20)\d{2}$/
  );

  if (!watchedAt) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!rate && rate !== 0) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || Number(rate) > 5 || Number(rate) < 1) {
    return res.status(HTTP_BAD_REQUEST)
      .send({ 
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
  }
  next();
};

module.exports = { 
  validateEmail, 
  validatePassword,
  validateAge,
  validateName,
  validateRate,
  validateTalk,
  validateWatchedAt,
  validateToken,
};
