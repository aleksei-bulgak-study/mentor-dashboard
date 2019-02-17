import React from 'react';
import { shallow } from 'enzyme';
import TableHead from '../../src/views/tableHead';

describe('TableHead', () => {
  test('should match snapshot', () => {
    const students = [
      'student', 'student2', 'student3',
    ];
    const wrapper = shallow(<TableHead students={students} />);
    expect(wrapper).toMatchSnapshot();
  });


  test('should match snapshot with empty list of students', () => {
    const students = [];
    const wrapper = shallow(<TableHead students={students} />);
    expect(wrapper).toMatchSnapshot();
  });
});
