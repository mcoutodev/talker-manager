const { HTTP_BAD_REQUEST } = require('../utils/variables');

// Verifica se um email é válido
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

module.exports = { validateEmail, validatePassword };
