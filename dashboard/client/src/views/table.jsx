import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableHead from './tableHead';
import TableBody from './tableBody';
import './table.css';

class TableContainer extends Component {
  render() {
    const { data: { mentors, tasks }, selected } = this.props;
    const { students, studentsInfo } = mentors[selected.label];
    return (
      <div className="student-results">
        <table className="student-results__table">
          <TableHead students={students} />
          <TableBody
            students={students}
            results={studentsInfo}
            tasks={tasks}
          />
        </table>
      </div>
    );
  }
}

TableContainer.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.objectOf(PropTypes.string),
};

TableContainer.defaultProps = {
  selected: { label: '', value: '' },
};

export default TableContainer;
