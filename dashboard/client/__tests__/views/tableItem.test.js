import React from 'react';
import { shallow } from 'enzyme';
import TableItem from '../../src/views/tableItem';

describe('TableItem', () => {
  test('should match snapshot', () => {
    const props = {
      color: 'green', mark: 95, link: 'https://example.com',
    };
    const wrapper = shallow(<TableItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should match snapshot when link is missed', () => {
    const props = {
      color: 'green', mark: 95, link: 'https://example.com',
    };
    const wrapper = shallow(<TableItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
