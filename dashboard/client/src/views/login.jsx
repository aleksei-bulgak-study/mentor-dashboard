import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DATA = {
  authorize: 'https://github.com/login/oauth/authorize',
  userName: 'https://rss-mentor-dashboard-login.herokuapp.com/login',
  accessKey: '0bebaf4ab40e810c3a38',
  scope: 'read:user',
  codePattern: /(.+)\?code=(.*)&state/,
};

class GitHubOAuthLogin extends Component {
  constructor(props) {
    super(props);
    this.onLogin = props.onLogin;
  }

  componentDidMount() {
    const clientInfo = window.location.href.match(DATA.codePattern);
    if (clientInfo && clientInfo[2]) {
      this.loadUserInfo(clientInfo[2]);
    }
  }

  loadUserInfo(clientId) {
    const url = `${DATA.userName}/${clientId}`;
    fetch(url)
      .then(response => response.text())
      .then((login) => {
        if (login) {
          this.onLogin(login);
        }
      });
  }

  render() {
    const uuid = Math.random().toString(36).substring(7);
    const url = `${DATA.authorize}?client_id=${DATA.accessKey}&scope=${DATA.scope}&state=${uuid}}`;
    return (
      <React.Fragment>
        <a href={url} className="login">
          <img src="https://image.flaticon.com/icons/png/512/25/25231.png" height="30" alt="Authorize via Github" />
        </a>
      </React.Fragment>
    );
  }
}

GitHubOAuthLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default GitHubOAuthLogin;
