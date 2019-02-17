import React from 'react';
import { shallow } from 'enzyme';
import TaskResultColumn from '../../src/containers/taskResultColumn';

describe('TaskResultColumn', () => {
  it('test snapshot does not changed', () => {
    // given
    const props = {
      status: 'Checked',
      result: { mark: 145 },
    };
    // when
    const wrapper = shallow(<TaskResultColumn {...props} />);
    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('test snapshot does not changed when status is invalid', () => {
    // given
    const props = {
      status: 'Invalid',
      result: { pr: 'https://example.com', mark: 145 },
    };
    // when
    const wrapper = shallow(<TaskResultColumn {...props} />);
    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('test snapshot does not changed when result is empty', () => {
    // given
    const props = {
      status: 'Checking',
    };
    // when
    const wrapper = shallow(<TaskResultColumn {...props} />);
    // then
    expect(wrapper).toMatchSnapshot();
  });


  it('test snapshot does not changed when work is in progress', () => {
    // given
    const props = {
      status: 'In Progress',
    };
    // when
    const wrapper = shallow(<TaskResultColumn {...props} />);
    // then
    expect(wrapper).toMatchSnapshot();
  });
});
