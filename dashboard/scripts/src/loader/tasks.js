const { CONST } = require('../constants.js');
const { loadJSON } = require('./dataLoader');

const config = loadJSON(CONST.config);

class TasksLoader {
  load(data, mentors) {
    this.result = { mentors };
    this.populateTasks(data[CONST.TASKS][0].data.slice(1));
    return this.result;
  }

  populateTasks(data) {
    this.result.tasks = [];
    data
      .filter(info => info[0] && info[2])
      .forEach((task) => {
        const [name, link, status] = this.fixMistakes(task);
        this.result.tasks.push({
          link,
          status,
          name: name.trim(),
        });
      });
    return this.result;
  }

  fixMistakes(task) {
    const [, link] = task;
    let [name, , status] = task;
    config.replacements.forEach((replacement) => {
      if (name.trim() === replacement.from) {
        name = replacement.to;
      }
      if (status.trim() === replacement.from) {
        status = replacement.to;
      }
    });
    return [name, link, status];
  }
}

module.exports = new TasksLoader();
