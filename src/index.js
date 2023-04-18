const express = require('express');
require('express-async-errors');
// Rotas
const talkerRoutes = require('./routes/talkerRoutes');
const loginRoutes = require('./routes/loginRoutes');
// Utilitários
const {
  HTTP_OK_STATUS, HTTP_ERROR_STATUS, PORT,
} = require('./utils/variables');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Roteamento dos endpoints
app.use('/talker', talkerRoutes);
app.use('/login', loginRoutes);

// Middlewares de erro
app.use((err, _req, _res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(HTTP_ERROR_STATUS).send({ error: err.message });
});

app.listen(PORT, () => console.log('Online'));
