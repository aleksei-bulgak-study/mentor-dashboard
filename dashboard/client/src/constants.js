export default {
  GITHUB_PREFIX: 'https://github.com/',
  status: {
    default: 'gray',
    failed: 'red',
    inProgress: 'yellow',
    checking: 'pink',
    done: 'green',
  },
  statuses: {
    Checked: {
      started: true,
      isReady: true,
      checking: false,
    },
    Checking: {
      started: true,
      isReady: true,
      checking: true,
    },
    'In Progress': {
      started: true,
      isReady: false,
      checking: false,
    },
    ToDo: {
      started: false,
      isReady: false,
      checking: false,
    },
  },
};
