import React from 'react';
import PropTypes from 'prop-types';
import constants from '../constants';

const TableHead = ({ students }) => (
  <thead>
    <tr>
      <th />
      {
        students.map(studentNickname => <Student key={studentNickname} name={studentNickname} />)
      }
    </tr>
  </thead>
);

const Student = ({ name }) => (
  <th key={name}>
    <a
      href={constants.GITHUB_PREFIX + name}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  </th>
);

TableHead.propTypes = {
  students: PropTypes.arrayOf(PropTypes.string),
};

TableHead.defaultProps = {
  students: [],
};

Student.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TableHead;
