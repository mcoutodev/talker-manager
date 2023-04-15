const express = require('express');
const { 
  HTTP_OK_STATUS, HTTP_CREATED_STATUS, TALKER_JSON,
} = require('../utils/variables');
const findTalker = require('../middlewares/findTalker');
const { 
  validateToken,
  validateAge, 
  validateName,
  validateRate, 
  validateTalk, 
  validateWatchedAt,
} = require('../middlewares/validate');
const { readJson, writeJson } = require('../utils/fsUtils');

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

// POST /talker
router.post('/', 
  validateToken,
  validateAge,
  validateName, 
  validateTalk, 
  validateRate, 
  validateWatchedAt,
  async (req, res) => {
    const talkers = await readJson(TALKER_JSON);
    const newTalker = { ...req.body, id: talkers.length + 1 };

    talkers.push(newTalker);
    await writeJson(TALKER_JSON, talkers);
    
    res.status(HTTP_CREATED_STATUS).send(newTalker);
  });

// PUT /talker/id
router.put('/:id', 
  validateToken,
  findTalker,
  validateAge,
  validateName, 
  validateTalk, 
  validateRate, 
  validateWatchedAt,
  async (req, res) => {
    const talkers = await readJson(TALKER_JSON);
    const updatedTalker = { ...req.body, id: req.locals.id };
    const updatedTalkers = talkers.map((talker) => {
      if (talker.id === req.locals.id) {
        return updatedTalker;
      }
      return talker;
    }); 

    await writeJson(TALKER_JSON, updatedTalkers);
    return res.status(HTTP_OK_STATUS).send(updatedTalker);
  });

module.exports = router;
