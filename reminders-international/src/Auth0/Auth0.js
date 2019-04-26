import React, { Component } from 'react';
import { Navbar, Button, NavbarBrand } from 'reactstrap';

import '../App.css';

class Auth0 extends Component {
  try = route => {
    this.props.history.push(route);
  };

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  goSignUp = event => {
    this.try('/signup');
  };

  redirectDash() {
    this.try('/dashboard');
  }

  logoutBtn = () => {
    if (this.props.userProfile) {
      return this.props.auth.userProfile.picture;
    }
    return `Log Out`;
  };

  componentDidMount() {
    const { handleAuthentication } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      handleAuthentication();
    }
  }

  isAuthenticated() {
    return true;
  }

  render() {
    // const logoutBtn = this.props.auth.userProfile.picture || `Log Out`;
    // const { isAuthenticated } = this.props.auth;
    console.log('THIS');
    console.log(this.props.auth);
    console.log('Auth0 Render props', this.props);

    //console.log("debugging...");
    //console.log(this.props.auth);
    return (
      <div className="Nav">
        <Navbar className="siteNavBar" color="white">
          <NavbarBrand color="light" href="/">
            Reminders International
          </NavbarBrand>

          {/* <Button
              color="primary"
              onClick={this.goSignUp}>
            Sign-up
          </Button> */}

          {localStorage.getItem('isLoggedIn') &&
          this.props.location.pathname === '/' ? (
            <Button
              id="dashBtn"
              color="primary"
              onClick={this.redirectDash.bind(this)}
            >
              Dashboard
            </Button>
          ) : null}

          {!localStorage.getItem('isLoggedIn') ? (
            <Button color="primary" onClick={this.login.bind(this)}>
              Sign Up or Log In
            </Button>
          ) : (
            <Button color="primary" onClick={this.logout.bind(this)}>
              Log Out
            </Button>
          )}
          {/* </Navbar.Header> */}
        </Navbar>
      </div>
    );
  }
}

export default Auth0;
