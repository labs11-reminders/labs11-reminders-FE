import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Users, Reminders, NewMessage, Org, Dashboard, People } from './components';
import axios from 'axios';

import Auth from './Auth0/Auth/Auth';
import Callback from './Auth0/Callback/Callback';
import Auth0 from './Auth0/Auth0';
import Home from './Home';

import './App.css';

class App extends Component {
  


  auth = new Auth();

  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.auth.handleAuthentication();
    }
  };

  render() {
    console.log('App Render', this.state);

    return (
      <div className="App">
        <Route
          path="/"
          render={props => <Auth0 auth={this.auth} {...props} />}
        />
        <Route
          exact
          path="/home"
          render={props => <Home auth={this.auth} {...props} />}
        />
        <Route
          exact
          path="/callback"
          render={props => {
            this.handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />

        <Route
          exact
          path="/users"
          render={props => (
            <Users
              {...props}
              auth={this.auth}
              //users={this.state.users}
            />
          )}
        />

        <Route
          exact
          path="/newmessages"
          render={props => <NewMessage {...props} auth={this.auth} />}
        />

        <Route
          exact
          path="/sms-form"
          render={props => (
            <Reminders {...props} users={this.state.reminders} />
          )}
        />

          {/* <Route 
            exact path='/join-org-form' 
            render={props => <Org {...props}
            auth={this.auth}
            /> }  */}
          <Route 
            exact path='/newmessage' 
            render={props => (<NewMessage {...props}
            auth={this.auth} />       
            )}
          />

          <Route 
            exact path='/people' 
            render={props => (<People {...props}
            auth={this.auth} />       
            )}
          />
      
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default withRouter(App);
