import React from 'react';
import PropTypes from 'prop-types';
import constants from '../constants';

const TableItem = ({ color, mark, link }) => (
  <td className={color} title={mark}>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="student-results__score"
    >
      {mark}
    </a>
  </td>
);

TableItem.propTypes = {
  color: PropTypes.string,
  mark: PropTypes.number,
  link: PropTypes.string,
};

TableItem.defaultProps = {
  color: constants.status.default,
  mark: 0,
  link: '',
};

export default TableItem;
