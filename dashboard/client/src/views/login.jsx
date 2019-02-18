import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DATA = {
  authorize: 'https://github.com/login/oauth/authorize',
  accessToken: 'https://github.com/login/oauth/access_token',
  user: 'https://api.github.com/user',
  uuid1: '0bebaf4ab40e810c3a38',
  uuid2: 'b504b6e5398940b0d10529e602eb758dc2df9f1d',
  scope: 'read:user',
  codePattern: /(.+)\?code=(.*)&state/,
};

class GitHubOAuthLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
    };
    this.onLogin = props.onLogin;
  }

  componentDidMount() {
    const clientInfo = window.location.href.match(DATA.codePattern);
    if (clientInfo && clientInfo[2]) {
      this.loadUserInfo(clientInfo[2]);
    }
  }

  loadUserInfo(clientId) {
    const url = `${DATA.accessToken}?client_id=${DATA.uuid1}&client_secret=${DATA.uuid2}&code=${clientId}`;
    fetch(url)
      .then(response => response.text)
      .then(data => fetch(`${DATA.user}?${data}`))
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        return data.login;
      })
      .then((login) => {
        this.setState({ login });
        this.onLogin(login);
      });
  }

  render() {
    const { login } = this.state;
    const uuid = Math.random().toString(36).substring(7);
    const url = `${DATA.authorize}?client_id=${DATA.uuid1}&scope=${DATA.scope}&state=${uuid}}`;
    return (
      <React.Fragment>
        {!login && <a href={url}>Authorize with Github</a>}
      </React.Fragment>
    );
  }
}

GitHubOAuthLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default GitHubOAuthLogin;
