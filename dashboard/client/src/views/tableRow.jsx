import React from 'react';
import PropTypes from 'prop-types';
import TaskResultsContainer from '../containers/taskResults';

const TableRow = (props) => {
  const { task } = props;
  return (
    <tr>
      <td key={task.name}>
        <a
          href={task.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {task.name}
        </a>
      </td>
      <TaskResultsContainer {...props} />
    </tr>
  );
};

TableRow.propTypes = {
  task: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TableRow;
