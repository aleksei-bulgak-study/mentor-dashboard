const data = require('./loader/dataLoader.js');
const mentorLoader = require('./loader/mentor.js');
const studentLoader = require('./loader/student.js');
const tasksLoader = require('./loader/tasks.js');
const { storeFile } = require('./store');
const { CONST } = require('./constants.js');

const mentors = mentorLoader.load(data);
let info = studentLoader.load(data, mentors);
info = tasksLoader.load(data, info);
storeFile(info, CONST.result);
