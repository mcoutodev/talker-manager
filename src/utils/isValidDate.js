const isValidDate = (date) => {
  const dateRegex = (
    /^(0[1-9]|[12]\d|3[01])[/\-.](0[1-9]|1[0-2])[/](19|20)\d{2}$/
  );
  return dateRegex.test(date);
};

module.exports = isValidDate;
