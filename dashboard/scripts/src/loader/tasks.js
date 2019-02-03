const { CONST } = require('../constants.js');

class TasksLoader {
  load(data, mentors) {
    this.result = { mentors };
    this.populateTasks(data[CONST.TASKS][0].data.slice(1));
    return this.result;
  }

  populateTasks(data) {
    this.result.tasks = [];
    data
      .filter(info => info[0] && info[1] && info[2])
      .forEach((task) => {
        const [name, link, status] = task;
        this.result.tasks.push({
          name, link, status,
        });
      });
    return this.result;
  }
}

module.exports = new TasksLoader();
