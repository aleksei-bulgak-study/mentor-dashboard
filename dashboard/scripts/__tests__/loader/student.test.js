const studentMapper = require('../../src/loader/student');

describe('Student mapper', () => {
  beforeAll(() => {
    studentMapper.mentorsMapping = null;
    studentMapper.valid = null;
    studentMapper.valid = null;
  });

  it('convertMentors', () => {
    // given
    const mentors = {
      mentor1: { github: 'MenTor 1' },
      mentor2: { github: 'MENTOR 2' },
      mentor3: { github: 'mENTOR 3' },
    };
    // when
    studentMapper.convertMentors(mentors);
    // then
    expect(studentMapper.mentorsMapping).toEqual({
      'mentor 1': { github: 'MenTor 1' },
      'mentor 2': { github: 'MENTOR 2' },
      'mentor 3': { github: 'mENTOR 3' },
    });
  });

  it('convertMentors without github keys', () => {
    // given
    const mentors = {
      mentor1: { name: 'MenTor 1' },
      mentor2: { github: 'MENTOR 2' },
      mentor3: { name: 'mENTOR 3' },
    };
    // when
    studentMapper.convertMentors(mentors);
    // then
    expect(studentMapper.mentorsMapping).toEqual({
      'mentor 2': { github: 'MENTOR 2' },
    });
  });

  it('convertMentors with empty list of mentors', () => {
    // given
    const mentors = {};
    // when
    studentMapper.convertMentors(mentors);
    // then
    expect(studentMapper.mentorsMapping).toEqual({});
  });

  it('filterData', () => {
    // given
    const data = [
      ['title that will be removed'],
      ['date', '   mentor1    ', 'https://github.com/student1', 'task1', 'https://github.com/test/pull/1', '50'],
      ['date', ' MENTOR1 ', 'https://github.com/student2', 'task1', 'https://github.com/pull/1', '-2'],
      ['date', ' mENTOR1', 'https://github.com/student3', 'task1', 'https://github.com/1', '10'],
      ['date', 'MentoR1  ', 'student4', 'task1', 'https://github.com/1', '10'],
      ['date', 'MentoR 2  ', 'https://github.com/student5', 'task1', 'https://github.com/test/pull/145', '100'],
    ];
    // when
    const failed = studentMapper.filterData(data);
    // then
    expect(studentMapper.valid).toEqual([
      ['date', 'mentor1', 'https://github.com/student1', 'task1', 'https://github.com/test/pull/1', '50'],
      ['date', 'mentor1', 'https://github.com/student3', 'task1', '', '10'],
      ['date', 'mentor1', 'student4', 'task1', '', '10'],
      ['date', 'mentor 2', 'https://github.com/student5', 'task1', 'https://github.com/test/pull/145', '100'],
    ]);
    expect(failed).toEqual([
      ['date', 'mentor1', 'https://github.com/student2', 'task1', 'https://github.com/pull/1', '-2'],
    ]);
  });

  it('buildStudents', () => {
    // given
    studentMapper.valid = [
      ['date', 'mentor1', 'https://github.com/student1', 'task1', 'https://github.com/test/pull/1', '50'],
      ['date', 'mentor1', 'https://github.com/student3', 'task1', '', '10'],
      ['date', 'mentor1', 'https://github.com/student1', 'task2', '', '10'],
      ['date', 'mentor 2', 'https://github.com/student5', 'task1', 'https://github.com/test/pull/145', '100'],
    ];
    // when
    studentMapper.buildStudents();
    // then
    expect(studentMapper.students).toEqual({
      'https://github.com/student1': {
        github: 'https://github.com/student1',
        tasks: {
          task1: {
            date: 'date', mark: '50', mentor: 'mentor1', pr: 'https://github.com/test/pull/1', task: 'task1',
          },
          task2: {
            date: 'date', mark: '10', mentor: 'mentor1', pr: '', task: 'task2',
          },
        },
      },
      'https://github.com/student3': {
        github: 'https://github.com/student3',
        tasks: {
          task1: {
            date: 'date', mark: '10', mentor: 'mentor1', pr: '', task: 'task1',
          },
        },
      },
      'https://github.com/student5': {
        github: 'https://github.com/student5',
        tasks: {
          task1: {
            date: 'date', mark: '100', mentor: 'mentor 2', pr: 'https://github.com/test/pull/145', task: 'task1',
          },
        },
      },
    });
  });

  it('mergeStudentsWithMentors', () => {
    // given
    studentMapper.mentorsMapping = {
      mentor1: { github: 'mentor1', students: ['student1', 'student4'], studentsInfo: [] },
      mentor2: { github: 'mentor2', students: ['student2', 'student7'], studentsInfo: [] },
      mentor3: { github: 'mentor3', students: ['student5', 'student6'], studentsInfo: [] },
    };
    studentMapper.students = {
      'https://github.com/student1': { name: 'student1' },
      'https://github.com/student2': { name: 'student1' },
      'https://github.com/student3': { name: 'student3' },
      'https://github.com/student4': { name: 'student4' },
    };
    // when
    const failed = studentMapper.mergeStudentsWithMentors();
    // then
    expect(failed).toEqual([
      { student: 'student7', mentor: 'mentor2' },
      { student: 'student5', mentor: 'mentor3' },
      { student: 'student6', mentor: 'mentor3' },
    ]);
  });
});
