import React from 'react';
import PropTypes from 'prop-types';
import TableItem from '../views/tableItem';
import constants from '../constants';

const getColorForTask = (status, result) => {
  let state = constants.status.default;
  const statusInfo = constants.statuses[status]
    ? constants.statuses[status] : constants.statuses.ToDo;
  if (!result && statusInfo.isReady) {
    state = constants.status.failed;
  }
  if (!result && !statusInfo.isReady && statusInfo.started) {
    state = constants.status.inProgress;
  }
  if (!result && statusInfo.isReady && statusInfo.checking && statusInfo.started) {
    state = constants.status.checking;
  }
  if (result) {
    state = constants.status.done;
  }
  return state;
};

const TaskResultColumnContainer = ({ status, result }) => {
  const color = getColorForTask(status, result);
  const mark = result ? result.mark : 0;
  const link = result ? result.pr : '#';
  return (
    <TableItem
      color={color}
      mark={mark}
      link={link}
    />
  );
};

TaskResultColumnContainer.propTypes = {
  status: PropTypes.string.isRequired,
  result: PropTypes.objectOf(PropTypes.any),
};

TaskResultColumnContainer.defaultProps = {
  result: undefined,
};

export default TaskResultColumnContainer;
