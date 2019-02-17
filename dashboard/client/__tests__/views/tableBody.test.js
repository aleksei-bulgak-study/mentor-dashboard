import React from 'react';
import { shallow } from 'enzyme';
import TableBody from '../../src/views/tableBody';

describe('TableBody', () => {
  it('default snapshot', () => {
    // given
    const props = {
      tasks: [
        { name: 'test', status: 'Checking', link: 'https://example.com/test' },
        { name: 'test2', status: 'In Progress', link: 'https://example.com/test2' },
      ],
      students: ['student1', 'student2'],
      results: [
        {
          github: 'https://github.com/student1',
          tasks: {
            test: { mark: 100, pr: 'https://example.com/task' },
            test2: { mark: 30, pr: 'https://example.com/task2' },
          },
        },
        {
          github: 'https://github.com/student2',
          tasks: {
            test2: { mark: 10, pr: 'https://example.com/task2' },
          },
        },
      ],
    };
    // when
    const wrapper = shallow(<TableBody {...props} />);
    // then
    expect(wrapper).toMatchSnapshot();
  });
});
