const dataLoader = require('../../src/loader/dataLoader');

dataLoader.loadJSON = jest.fn(() => ({ replacements: [{ from: 'tASK', to: 'Task' }] }));
const tasksMapper = require('../../src/loader/tasks');

const tasks = {
  tasks: [{
    data: [
      ['title'],
      ['task 1', 'link', 'status'],
      ['task 2', 'link', ''],
      ['task 3', '', 'status 2'],
      ['', '', 'status 3'],
      ['', '', ''],
      [],
      ['tASK', 'link', 'status 4'],
    ],
  }],
};

describe('Tasks mapping', () => {
  it('success case', () => {
    const results = tasksMapper.load(tasks, { data: 'stub data with mentors' });
    expect(results).toEqual({
      mentors: { data: 'stub data with mentors' },
      tasks: [
        { link: 'link', status: 'status', name: 'task 1' },
        { link: '', status: 'status 2', name: 'task 3' },
        { link: 'link', status: 'status 4', name: 'Task' },
      ],
    });
  });

  it('empty list of tasks passed', () => {
    const results = tasksMapper.load({ tasks: [{ data: [] }] }, { data: 'stub data with mentors' });
    expect(results).toEqual({
      mentors: { data: 'stub data with mentors' },
      tasks: [],
    });
  });
});
