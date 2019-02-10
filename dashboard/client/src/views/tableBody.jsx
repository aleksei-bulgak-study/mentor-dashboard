import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './tableRow';

class TableBody extends React.Component {
  render() {
    const { students, results, tasks } = this.props;
    return (
      <tbody>
        {
          tasks.map(task => (
            <TableRow
              key={task.name}
              task={task}
              students={students}
              results={results}
            />
          ))
        }
      </tbody>
    );
  }
}

TableBody.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string,
    ),
  ).isRequired,
  students: PropTypes.arrayOf(PropTypes.string).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;
