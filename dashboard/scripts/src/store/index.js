const fs = require('fs');
const path = require('path');

module.exports.storeFile = (data, file, dir = '') => {
  const pathToFile = path.join(__dirname, dir, file);
  const dataJson = JSON.stringify(data);
  fs.writeFile(pathToFile, dataJson, (error) => error && process.stderr.write(error));
};
