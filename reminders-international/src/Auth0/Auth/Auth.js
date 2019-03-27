import auth0 from './auth0-js';
const dotenv = require('dotenv');
// const result = dotenv.config();

export default class Auth {
    accessToken;
    idToken;
    expiresAt;

    //below needs to be attached to the .env file for security in the end

    auth0 = new auth0.WebAuth({
      domain: "dev-fkl4pfae.auth0.com",
      clientID: "thcZp1ZuBv61K2Gxcpv5QpxnpkJiV5AP",
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid'
    });

    constructor() {
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
      this.getIdToken = this.getIdToken.bind(this);
      this.renewSession = this.renewSession.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
          } else if (err) {
           this.props.history.push('/');
            console.log(err);
            alert(`Error: ${err.error}. Check the console for further details.`);
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
    
        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;
    
        // navigate to the home route
        this.props.history.push('/');
      }
    
      renewSession() {
        this.auth0.checkSession({}, (err, authResult) => {
           if (authResult && authResult.accessToken && authResult.idToken) {
             this.setSession(authResult);
           } else if (err) {
             this.logout();
             console.log(err);
             alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
           }
        });
      }
    
      logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;
    
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
    
        // navigate to the home route
        this.props.history.push('/');
      }
    
      isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
      }
};