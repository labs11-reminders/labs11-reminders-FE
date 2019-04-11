import history from '../../history.js';
import auth0 from 'auth0-js';
import axios from 'axios';

//const dotenv = require('dotenv'); //need to uncomment for local dev and testing

// const result = dotenv.config();

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;
  tokenRenewalTimeout;

  //below needs to be attached to the .env file for security in the end

  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_DOMAIN,
    clientID: process.env.REACT_APP_CLIENTID,
    redirectUri: process.env.REACT_APP_CALLBACKURL,
    responseType: 'token id_token',
    audience: 'https://localhost:3000/users',
    // scope: 'openid profile',
    scope: 'openid profile admin:access',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getExpiryDate = this.getExpiryDate.bind(this);
    this.scheduleRenewal();
  }

  // checks the users database to see if the user has logged in to the site before
  verifyAuth0User() {
    console.log('starting user verification');
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        {
          axios
            .post(`${process.env.REACT_APP_BACKEND}/api/users/auth`, {
              auth0_sub: profile.sub,
            })

            .then(res => {
              if (res.data.length === 0) {
                console.log('Signing up new user.');
                history.replace('/signup');
              } else {
                console.log('Existing user signing in.');
                history.replace('/dashboard');
              }
            })
            .catch(err => {
              console.log(err);
              console.log({ message: 'Error verifying Auth0 login' });
            });
        }
      }
    });
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    console.log('Auth0: Executing Authentication handler.');
    this.auth0.parseHash((err, authResult) => {
      console.log('AUTH-RESULT', authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        console.log('Auth0: success.', authResult);
      } else if (err) {
        history.replace('/');
        console.log('Auth0: failure.', authResult);
        console.log(err);
        // alert(`Error: ${err.error}. Check the console for further details!!`);
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('idToken', authResult.idToken);

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 5000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // schedule a token renewal
    this.scheduleRenewal();
    console.log('User logging in.');
    // navigate to the home route or signup depending on user status
    this.verifyAuth0User();
  }

  renewSession() {
    //commented out so that routes are available/ buggy and needs fixed
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        console.log(
          'Result',
          authResult,
          'accessToken',
          authResult.accessToken,
          'idToken',
          authResult.idToken,
        );
      } else if (err) {
        this.logout();
        console.log(
          `Could not get a new token (${err.error}: ${err.error_description}).`,
        );
      }
    });
  }

  getProfile(cb) {
    // Get access token from local storage if not defined.
    if (this.accessToken) {
      var accessToken = this.accessToken;
    } else {
      var accessToken = localStorage.getItem('accessToken');
    }
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        // Populate user profile with backend data
        axios
          .post(`${process.env.REACT_APP_BACKEND}/api/users/auth`, {
            auth0_sub: profile.sub,
          })
          .then(res => {
            this.userProfile.org_id = res.data.org_id;
            this.userProfile.role_id = res.data.role_id;
            this.userProfile.country = res.data.country;
            this.userProfile.phone = res.data.phone;
            console.log('User profile load complete.');
          })
          .catch(err => {
            console.log('User profile failed to load.');
            console.log(err);
          });
      }
      cb(err, profile);
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user profile
    this.userProfile = null;

    // clear token renewal
    clearTimeout(this.tokenRenewalTimeout);

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresIn');

    // clear our Auth0 session
    this.auth0.logout({
      returnTo: process.env.REACT_APP_LOGOUTURL,
      client_id: process.env.REACT_APP_CLIENTID,
    });

    // navigate to the home route

    history.replace('/home'); ///*****Rachel, come back to this is this the Auth0 buggy spot?
    // window.location.reload();
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt));
  }
}
