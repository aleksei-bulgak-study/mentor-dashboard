import React from 'react';
import PropTypes from 'prop-types';
import TaskResultColumnContainer from './taskResultColumn';

const TaskResultContainer = ({ task, results }) => (
  <TaskResultColumnContainer status={task.status} result={results[task.name]} />
);

TaskResultContainer.propTypes = {
  task: PropTypes.objectOf(PropTypes.string).isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TaskResultContainer;
