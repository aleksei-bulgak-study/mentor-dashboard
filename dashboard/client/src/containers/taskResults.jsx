import React from 'react';
import PropTypes from 'prop-types';
import TaskResultContainer from './taskResult';

class TaskResultsContainer extends React.Component {
  filterStudentResults(student, results) {
    const studentResults = results.filter(result => result.github.includes(student))[0];
    return studentResults ? studentResults.tasks : {};
  }

  render() {
    const { task, students, results } = this.props;
    return (
      <React.Fragment>
        {
          students.map(student => (
            <TaskResultContainer
              key={task.name + student}
              task={task}
              student={student}
              results={this.filterStudentResults(student, results)}
            />
          ))
        }
      </React.Fragment>
    );
  }
}

TaskResultsContainer.propTypes = {
  task: PropTypes.objectOf(PropTypes.string).isRequired,
  students: PropTypes.arrayOf(PropTypes.string).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TaskResultsContainer;
