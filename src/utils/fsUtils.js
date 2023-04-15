const fs = require('fs').promises;

// Realiza a leitura de arquivos JSON
const readJson = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { readJson };
