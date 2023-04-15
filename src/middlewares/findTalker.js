const { readJson } = require('../utils/fsUtils');
const { 
  HTTP_NOT_FOUND, 
  TALKER_JSON,
} = require('../utils/variables');

// Tenta encontrar um palestrante pelo ID
const findTalker = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readJson(TALKER_JSON);
  const talkerFound = talkers.find((talker) => talker.id === Number(id));
  
  if (!talkerFound) {
    return res.status(HTTP_NOT_FOUND)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }
  req.locals = talkerFound;
  next();
};

module.exports = findTalker;
