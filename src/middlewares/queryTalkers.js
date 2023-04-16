const { readJson } = require('../utils/fsUtils');
const { TALKER_JSON } = require('../utils/variables');

// Query talkers using params sent in the request
const hasKeys = (object) => Object.keys(object).some((key) => (
  ['q', 'rate'].find((element) => element === key)));

const queryByName = (query, talkers) => {
  if (query === '') {
    return talkers;
  }
  return talkers.filter(({ name }) => (
    name.toLowerCase().includes(query.toLowerCase())
  ));
};

const queryByRate = (query, talkers) => (
  talkers.filter(({ talk }) => talk.rate === Number(query))
);

const queryTalkers = async (req, _res, next) => {
  const { q, rate } = req.query;
  const talkers = await readJson(TALKER_JSON);
  
  req.locals = talkers;

  if (q !== undefined) {
    req.locals = queryByName(q, req.locals);
  } 
  if (rate !== undefined) {
    req.locals = queryByRate(rate, req.locals);
  } 
  if (!hasKeys(req.query)) {
    req.locals = [];
  }
  next();
};

module.exports = queryTalkers;
