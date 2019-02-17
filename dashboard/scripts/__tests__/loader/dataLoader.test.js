jest.mock('fs');
jest.mock('node-xlsx');
const fs = require('fs');
const nodeXlsx = require('node-xlsx');

describe('DataLoader', () => {
  afterAll(() => {
    jest.clearAllMocks();
    jest.unmock('fs');
    jest.unmock('node-xlsx');
  });

  it('success case', () => {
    fs.readFileSync = jest.fn();
    fs.readFileSync.mockImplementationOnce(() => '{"files": {"mentor": "test.xslx", "mentor-student": "test.xslx","tasks": "test.xslx"}}');
    nodeXlsx.parse = jest.fn(() => 'test data from xlsx file');
    const { data } = require('../../src/loader/dataLoader'); // eslint-disable-line
    Object.keys(data).forEach(key => expect(data[key]).toEqual('test data from xlsx file'));
    expect(fs.readFileSync).toBeCalledTimes(4);
    expect(nodeXlsx.parse).toBeCalledTimes(3);
  });
});
