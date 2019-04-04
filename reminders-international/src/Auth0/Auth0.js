import React, { Component } from 'react';
import { Navbar, Button, NavbarBrand } from 'reactstrap';


//import './App.css';

class Auth0 extends Component {
  try = (route) => {
    this.props.history.push(route);
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  goSignUp = event => {
    this.try("/signup");
  }


  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  isAuthenticated() {
      return true;
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    console.log("THIS")
    console.log(this)
    //console.log("debugging...");
    //console.log(this.props.auth);
    return (
      <div>
        <Navbar color="light">
          <NavbarBrand href="/">Reminders International</NavbarBrand>
         
          <Button
              color="primary"
              onClick={this.goSignUp}>
            Sign-up
          </Button>
            {
              !isAuthenticated() && (
                  <Button
                    color="primary"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    color="primary"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          {/* </Navbar.Header> */}
        </Navbar> 
      </div>
    );
  }
}

export default Auth0;