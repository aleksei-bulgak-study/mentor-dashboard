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
    };
    this.onSelect = this.onSelect.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onSelect(selected) {
    if (data.mentors[selected.label]) {
      Main.saveDefaultMentor(selected);
    }
    this.setState({ selected });
  }

  onLogin(nickname) {
    const mentor = this.data.mentors[nickname.toLowerCase()];
    if (mentor) {
      this.onSelect({
        label: nickname,
        value: mentor.github,
      });
    }
  }

  render() {
    const { selected } = this.state;
    return (
      <React.Fragment>
        <GitHubOAuthLogin onLogin={this.onLogin} />
        <h1>Mentor Dashboard</h1>
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
