const fs = require('fs');
const path = require('path');
const { parse } = require('node-xlsx');
const { CONST } = require('../constants.js');

function loadFile(filePath, dir = '') {
  return fs.readFileSync(path.join(__dirname, dir, filePath));
}

function loadJSON(filePath, dir) {
  return JSON.parse(loadFile(filePath, dir));
}

function loadXLSX(filePath, dir) {
  return parse(loadFile(filePath, dir), { cellDates: true });
}

const configuration = loadJSON(CONST.config);
const dataFiles = {};

Object.keys(configuration.files).forEach((fileName) => {
  dataFiles[fileName] = loadXLSX(configuration.files[fileName], CONST.dataDir);
});

module.exports.loadJSON = loadJSON;
module.exports.data = dataFiles;
