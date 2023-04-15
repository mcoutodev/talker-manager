const { readJson } = require('../utils/fsUtils');
const { TALKER_JSON } = require('../utils/variables');

// Query talkers using params sent in the request
const queryByName = (query, talkers) => {
  if (query === '') {
    return talkers;
  }
  return talkers.filter((talker) => (
    talker.name.toLowerCase().includes(query.toLowerCase())
  ));
};

const queryTalkers = async (req, _res, next) => {
  const { q } = req.query;

  if (q !== undefined) {
    const talkers = await readJson(TALKER_JSON);
    req.locals = queryByName(q, talkers);
    next();
  }
  req.locals = [];
  next();
};

module.exports = queryTalkers;
