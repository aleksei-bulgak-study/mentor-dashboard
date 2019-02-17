const store = require('../../src/store');
const { CONST } = require('../../src/constants');

const data = {
  [CONST.MENTOR_STUDENT]: [
    {
      data: [
        ['test line will be removed'],
        [
          'fist name last name',
          'student 1',
        ],
        [
          'invalid count of students will be skipped',
          'student 2',
        ],
        [
          'second mentor',
          'student 3',
        ],
        [
          '',
          'empty mentor full name',
        ],
        [
          'fist name last name',
          'student 4',
        ],
        [
          'empty student\'s github',
          '',
        ],
        [
          'second mentor',
          'student 5',
        ],
      ],
    },
    {
      data: [
        ['test line that will be removed'],
        [
          '  fist name  ',
          '  last name ',
          'Minsk',
          '4',
          'GitHhub-Nick-Name',
        ],
        [
          'invalid count of students',
          'will be skipped',
          'Brest',
          '-1',
          'GitHhub-Nick-Name2',
        ],
        [
          '',
          'empty first name',
          'Brest',
          '2',
          'GitHhub-Nick-Name3',
        ],
        [
          'empty last name',
          '',
          'Brest',
          '2',
          'GitHhub-Nick-Name4',
        ],
        [
          'second       ',
          '      mentor',
          'Baranovichy',
          '45',
          'testUser',
        ],
      ],
    },
  ],
};

describe('Mentors mapping', () => {
  afterAll(() => {
    store.storeFile.mockRestore();
  });

  it('test load method', () => {
    store.storeFile = jest.fn();
    const mentorLoader = require('../../src/loader/mentor'); // eslint-disable-line
    expect(mentorLoader.load(data)).toEqual({
      'fist name last name': {
        firstName: 'fist name',
        lastName: 'last name',
        github: 'githhub-nick-name',
        city: 'Minsk',
        students: ['student 1', 'student 4'],
        studentsInfo: [],
      },
      'second mentor': {
        firstName: 'second',
        lastName: 'mentor',
        github: 'testuser',
        city: 'Baranovichy',
        students: ['student 3', 'student 5'],
        studentsInfo: [],
      },
    });


    expect(store.storeFile).toBeCalledTimes(1);
    expect(store.storeFile.mock.calls[0][0]).toEqual([{
      mentor: 'invalid count of students will be skipped',
      student: 'student 2',
    }]);
  });

  it('empty mentors tab', () => {
    const mentorLoader = require('../../src/loader/mentor'); // eslint-disable-line
    mentorLoader.buildMenthorsUniqueList([]);
    expect(mentorLoader.mentors).toEqual({});
  });

  it('all mentors data is invalid', () => {
    const mentorLoader = require('../../src/loader/mentor'); // eslint-disable-line
    mentorLoader.buildMenthorsUniqueList([
      [],
      [],
      ['', 'last name', '1', 'Minsk'],
      ['first', '', '1', 'Minsk'],
      ['first', 'last', '0', 'Minsk'],
      ['first', '', '1'],
    ]);
    expect(mentorLoader.mentors).toEqual({});
  });

  it('populate mapping when mentors list is empty', () => {
    const mentorLoader = require('../../src/loader/mentor'); // eslint-disable-line
    mentorLoader.mentors = {};
    const response = mentorLoader.populateStudentsArray([
      [],
      ['mentor 1', 'student 1'],
      ['mentor 2', 'student 2'],
      ['mentor 3', 'student 3'],
    ]);

    expect(mentorLoader.mentors).toEqual({});
    expect(response).toEqual([
      { mentor: 'mentor 1', student: 'student 1' },
      { mentor: 'mentor 2', student: 'student 2' },
      { mentor: 'mentor 3', student: 'student 3' },
    ]);
  });


  it('populate mapping for single mentor', () => {
    const mentorLoader = require('../../src/loader/mentor'); // eslint-disable-line
    mentorLoader.mentors = { mentor: { students: [] } };
    const response = mentorLoader.populateStudentsArray([
      [],
      ['mentor', 'student 1'],
      ['', 'student 2'],
      ['another not mapped mentor', 'student 2'],
      ['mentor', 'student 3'],
    ]);

    expect(mentorLoader.mentors).toEqual({
      mentor: {
        students: [
          'student 1',
          'student 3',
        ],
      },
    });
    expect(response).toEqual([
      { mentor: 'another not mapped mentor', student: 'student 2' },
    ]);
  });

  it('populate mapping when list of pairs is empty', () => {
    const mentorLoader = require('../../src/loader/mentor'); // eslint-disable-line
    mentorLoader.mentors = { mentor: { students: [] } };
    const response = mentorLoader.populateStudentsArray([
      [],
    ]);

    expect(mentorLoader.mentors).toEqual({
      mentor: { students: [] },
    });
    expect(response).toEqual([]);
  });
});
