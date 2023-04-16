const express = require('express');
const { 
  HTTP_OK_STATUS, HTTP_CREATED_STATUS, TALKER_JSON, HTTP_NO_CONTENT,
} = require('../utils/variables');
const findTalker = require('../middlewares/findTalker');
const queryTalkers = require('../middlewares/queryTalkers');
const { 
  validateToken,
  validateAge, 
  validateName,
  validateTalkerRate, 
  validateTalk, 
  validateTalkerWatchedAt,
  validateQueryRate,
  validateQueryDate,
  validatePatchRate,
} = require('../middlewares/validate');
const { readJson, writeJson } = require('../utils/fsUtils');

// Usa o middleware Router
const router = express.Router();

// GET /talker
router.get('/', async (_req, res) => {
  const talkers = await readJson(TALKER_JSON);
  res.status(HTTP_OK_STATUS).send(talkers || []);
});

// GET /talker/search
router.get('/search', 
  validateToken, 
  validateQueryRate,
  validateQueryDate,
  queryTalkers, 
  (req, res) => {
    res.status(HTTP_OK_STATUS).send(req.locals);
  });

// POST /talker
router.post('/', 
  validateToken,
  validateAge,
  validateName, 
  validateTalk, 
  validateTalkerRate, 
  validateTalkerWatchedAt,
  async (req, res) => {
    const talkers = await readJson(TALKER_JSON);
    const newTalker = { ...req.body, id: talkers.length + 1 };

    talkers.push(newTalker);
    await writeJson(TALKER_JSON, talkers);
    
    res.status(HTTP_CREATED_STATUS).send(newTalker);
  });

// PATCH /talker/rate/:id
router.patch('/rate/:id', 
  validateToken, 
  validatePatchRate,
  findTalker, 
  async (req, res) => {
    const talkers = await readJson(TALKER_JSON);
    const updatedTalkers = talkers.map((talker) => {
      if (talker.id === req.locals.id) {
        const { talk } = talker;
        talk.rate = req.body.rate;
        return talker;
      }
      return talker;
    });
    
    await writeJson(TALKER_JSON, updatedTalkers);
    res.status(HTTP_NO_CONTENT).end();
  });

// GET /talker/:id
router.get('/:id', findTalker, (req, res) => res.status(HTTP_OK_STATUS)
  .send(req.locals));

// PUT /talker/:id
router.put('/:id', 
  validateToken,
  findTalker,
  validateAge,
  validateName, 
  validateTalk, 
  validateTalkerRate, 
  validateTalkerWatchedAt,
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
    res.status(HTTP_OK_STATUS).send(updatedTalker);
  });

// DELETE /talker/:id
router.delete('/:id', validateToken, findTalker, async (req, res) => {
  const talkers = await readJson(TALKER_JSON);
  const updatedTalkers = talkers.filter(({ id }) => id !== req.locals.id);
  await writeJson(TALKER_JSON, updatedTalkers);
  res.status(HTTP_NO_CONTENT).end();
});

module.exports = router;
