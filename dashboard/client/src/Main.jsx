import React from 'react';
import SearchComponent from './views/search';
import TableContainer from './views/table';
import data from '../assets/mentors.json';
import './main.css';
import GitHubOAuthLogin from './views/login';

const CONST = {
  SELECTED: 'rss-dashboard-selected-mentor',
};

class Main extends React.Component {
  static saveDefaultMentor(value) {
    localStorage.setItem(CONST.SELECTED, JSON.stringify(value));
  }

  static getDefaultMentor() {
    const previous = localStorage.getItem(CONST.SELECTED);
    if (!previous) {
      return null;
    }
    const mentor = JSON.parse(previous);
    if (mentor && mentor.label && data.mentors[mentor.label]) {
      return mentor;
    }
    return null;
  }

  constructor(props) {
    super(props);
    const selected = Main.getDefaultMentor();
    this.state = {
      selected,
      failed: false,
      login: null,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onSelect(selected) {
    if (data.mentors[selected.label]) {
      Main.saveDefaultMentor(selected);
    }
    this.setState({ selected, failed: false });
  }

  onLogin(nickname) {
    const mentor = Object.keys(data.mentors)
      .filter(key => data.mentors[key].github.includes(nickname.toLowerCase()))[0];
    if (mentor) {
      this.onSelect({
        label: mentor,
        value: data.mentors[mentor].github,
      });
      this.setState({ failed: false });
    } else {
      this.setState({
        login: nickname,
        failed: true,
      });
    }
  }

  render() {
    const { selected, failed, login } = this.state;
    return (
      <React.Fragment>
        <h1>
          Mentor Dashboard
        </h1>
        <GitHubOAuthLogin onLogin={this.onLogin} />
        {
          failed === true
          && (
            <p className="login--failed">
              Sorry user with nickname
              {' '}
              {login}
              {' '}
              not found
            </p>
          )
        }
        <SearchComponent
          data={data}
          selected={selected}
          onSelect={this.onSelect}
        />
        {
          selected !== null && (
            <TableContainer
              data={data}
              selected={selected}
            />
          )
        }
      </React.Fragment>
    );
  }
}

export default Main;
