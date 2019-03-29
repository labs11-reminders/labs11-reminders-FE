import React, { Component } from 'react';
import { Navbar, Button } from 'reactstrap';
//import './App.css';

class Auth0 extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
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
        <Navbar >
          {/* <Navbar.Header> */}
            {/* <Navbar.Brand>
              <a href="">Reminders International</a>
            </Navbar.Brand> */}
            {/* <Button
              // bsStyle="primary"
              // className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button> */}
            {
              !isAuthenticated() && (
                  <Button
                    // id="qsLoginBtn"
                    // bsStyle="primary"
                    // className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    // id="qsLogoutBtn"
                    // bsStyle="primary"
                    // className="btn-margin"
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