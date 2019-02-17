import React from 'react';
import { shallow } from 'enzyme';
import TableRow from '../../src/views/tableRow';

describe('TableRow', () => {
  it('default snapshot', () => {
    // given
    const props = {
      task: { name: 'test', status: 'Checking', link: 'https://example.com/test' },
      students: ['student1', 'student2'],
      results: [
        {
          github: 'https://github.com/student1',
          tasks: {
            test: { mark: 100, pr: 'https://example.com/task' },
            test2: { mark: 30, pr: 'https://example.com/task2' },
          },
        },
      ],
    };
    // when
    const wrapper = shallow(<TableRow {...props} />);
    // then
    expect(wrapper).toMatchSnapshot();
  });
});
