const { CONST } = require('../constants.js');
const { storeFile } = require('../store');

class MentorLoader {
  load(data) {
    this.buildMenthorsUniqueList(data[CONST.MENTOR_STUDENT][1].data);
    const notMappedPairs = this.populateStudentsArray(data[CONST.MENTOR_STUDENT][0].data);
    storeFile(notMappedPairs, CONST.notMappedPais, CONST.errorsDir);
    return this.mentors;
  }

  buildMenthorsUniqueList(data) {
    this.mentors = {};
    const mentorsData = data.slice(1);
    mentorsData
      .filter((mentor) => mentor[0] && mentor[1] && mentor[4] && mentor[3] > 0)
      .forEach((mentor) => {
        const fullName = `${mentor[0].trim()} ${mentor[1].trim()}`;
        this.mentors[fullName] = {
          firstName: mentor[0].trim(),
          lastName: mentor[1].trim(),
          github: mentor[4].toLowerCase(),
          city: mentor[2],
          students: [],
          studentsInfo: [],
        };
      });
  }

  populateStudentsArray(data) {
    const notParsedPairs = [];
    data.slice(1)
      .filter((pair) => pair[0] && pair[1])
      .forEach((pair) => {
        const mentor = this.mentors[pair[0]];
        if (mentor) {
          mentor.students.push(pair[1]);
        } else {
          notParsedPairs.push({
            mentor: pair[0].toLowerCase(),
            student: pair[1].toLowerCase(),
          });
        }
      });
    return notParsedPairs;
  }
}

module.exports = new MentorLoader();
