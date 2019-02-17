const { CONST } = require('../constants.js');
const { storeFile } = require('../store');

const order = {
  DATE: 0,
  MENTOR: 1,
  STUDENT: 2,
  TASK: 3,
  PR: 4,
  MARK: 5,
  COMMENT: 6,
  ACTION: 7,
};

const PREFIX = /^(https|http):\/\/github.com\/.+\/pull\/[0-9]+/i;
const STUDENT = /^(https|http):\/\/github.com\/[^/\\]+/i;
const ghPrefix = 'https://github.com/';

class StudentLoader {
  load(data, mentors) {
    this.convertMentors(mentors);
    this.filterData(data[CONST.MENTOR][0].data);
    this.buildStudents();
    const failed = this.mergeStudentsWithMentors();
    storeFile(failed, CONST.notMappedStudents, CONST.errorsDir);
    return mentors;
  }

  convertMentors(mentors) {
    this.mentorsMapping = {};
    Object.keys(mentors).forEach((key) => {
      let { github } = mentors[key];
      if (github) {
        github = github.toLowerCase();
        this.mentorsMapping[github] = mentors[key];
      }
    });
  }

  filterData(data) {
    const failed = [];
    this.valid = data.slice(1)
      .filter(info => info[0] && info[1] && info[2])
      .map((info) => {
        info[order.STUDENT] = info[order.STUDENT].toLowerCase().trim();
        info[order.MENTOR] = info[order.MENTOR].toLowerCase().trim();
        info[order.PR] = info[order.PR].trim();
        return info;
      })
      .filter((info) => {
        if (STUDENT.test(info[order.STUDENT])
          && info[order.PR]
          && PREFIX.test(info[order.PR])) {
          return true;
        }
        if (info[order.MARK] >= 0) {
          info[order.PR] = '';
          return true;
        }
        failed.push(info);
        return false;
      });
    return failed;
  }

  buildStudents() {
    this.students = {};
    this.valid
      .forEach((info) => {
        const student = this.students[info[order.STUDENT].toLowerCase().trim()];
        const task = {
          task: info[order.TASK].trim(),
          pr: info[order.PR].trim(),
          mentor: info[order.MENTOR].trim(),
          mark: info[order.MARK],
          comment: info[order.COMMENT],
          action: info[order.ACTION],
          date: info[order.DATE],
        };
        if (student) {
          student.tasks[info[order.TASK].trim()] = task;
        } else {
          this.students[info[order.STUDENT].toLowerCase().trim()] = {
            github: info[order.STUDENT].toLowerCase().trim(),
            tasks: { [task.task]: task },
          };
        }
      });
  }

  mergeStudentsWithMentors() {
    const failed = [];
    Object.keys(this.mentorsMapping).forEach((mentorsGH) => {
      const mentor = this.mentorsMapping[mentorsGH];
      const { students } = mentor;
      students.forEach((student) => {
        const gh = (ghPrefix + student).toLowerCase();
        const studentInfo = this.students[gh];
        if (studentInfo) {
          mentor.studentsInfo.push(studentInfo);
        } else {
          failed.push({
            student,
            mentor: mentor.github,
          });
        }
      });
    });
    return failed;
  }
}

module.exports = new StudentLoader();
