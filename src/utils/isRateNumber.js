const isRateNumber = (rate) => {
  const numRate = Number(rate);

  if (!Number.isInteger(numRate) 
    || Number(numRate) > 5 
    || Number(numRate) < 1) {
    return false;
  }
  return true;
};

module.exports = isRateNumber;
