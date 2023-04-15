const express = require('express');
const { HTTP_OK_STATUS, TALKER_JSON } = require('../utils/variables');
const findTalker = require('../middlewares/findTalker');
const { readJson } = require('../utils/fsUtils');

// Usa o middleware Router
const router = express.Router();

// GET /talker
router.get('/', async (_req, res) => {
  const talkers = await readJson(TALKER_JSON);
  res.status(HTTP_OK_STATUS).send(talkers || []);
});

// GET /talker/id
router.get('/:id', findTalker, (req, res) => res.status(HTTP_OK_STATUS)
  .send(req.locals));

module.exports = router;
