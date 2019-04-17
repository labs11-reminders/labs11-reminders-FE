import React, { Component } from 'react';
import { Navbar, Button, NavbarBrand } from 'reactstrap';

//import './App.css';

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
    // const { isAuthenticated } = this.props.auth;
    console.log('THIS');
    console.log(this.props.auth);
    //console.log("debugging...");
    //console.log(this.props.auth);
    return (
      <div>
        <Navbar color="dark">
          <NavbarBrand color="light" href="/" >Reminders International</NavbarBrand>

          {/* <Button
              color="primary"
              onClick={this.goSignUp}>
            Sign-up
          </Button> */}
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
