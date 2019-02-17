import React from 'react';
import { shallow } from 'enzyme';
import TaskResultsContainer from '../../src/containers/taskResults';

describe('TaskResultsContainer', () => {
  it('default snapshot', () => {
    // given
    const props = {
      task: { name: 'test', status: 'Checking' },
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
    const wrapper = shallow(<TaskResultsContainer {...props} />);
    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('filterStudentResults', () => {
    // given
    const results = [
      {
        github: 'https://github.com/student1',
        tasks: {
          test: { mark: 100, pr: 'https://example.com/task' },
          test2: { mark: 30, pr: 'https://example.com/task2' },
        },
      },
    ];
    // when
    const instance = shallow(<TaskResultsContainer students={[]} results={[]} task={({})} />)
      .instance();
    // then
    expect(instance.filterStudentResults('student1', results)).toEqual({
      test: { mark: 100, pr: 'https://example.com/task' },
      test2: { mark: 30, pr: 'https://example.com/task2' },
    });
    expect(instance.filterStudentResults('student2', results)).toEqual({});
  });
});
