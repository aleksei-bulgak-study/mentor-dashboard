import React from 'react';
import { shallow } from 'enzyme';
import TaskResultContainer from '../../src/containers/taskResult';

describe('TaskResultContainer', () => {
  it('test snapshot does not changed', () => {
    // given
    const props = {
      task: {
        name: 'test',
        status: 'Checked',
      },
      results: {
        test: {
          mark: 10,
          pr: 'http://example.com',
        },
      },
    };
    // when
    const wrapper = shallow(<TaskResultContainer {...props} />);
    // then
    expect(wrapper).toMatchSnapshot();
  });
});
