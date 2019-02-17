jest.mock('fs');
const fs = require('fs');
const { storeFile } = require('../../src/store');

describe('store operation', () => {
  it('success case', () => {
    const data = { test: 'data' };
    const file = 'test.json';

    storeFile(data, file);
    expect(fs.writeFile.mock.calls[0][0]).toContain(file);
    expect(fs.writeFile.mock.calls[0][1]).toEqual(JSON.stringify(data));
  });
});
