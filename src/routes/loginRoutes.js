const express = require('express');
const { v4: uuid } = require('uuid');
const { validateEmail, validatePassword } = require('../middlewares/validate');
const { HTTP_OK_STATUS } = require('../utils/variables');

const router = express.Router();

// POST /login
router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = uuid().replace(/-/g, '').substring(0, 16);
  res.status(HTTP_OK_STATUS).send({ token });
});

module.exports = router;
