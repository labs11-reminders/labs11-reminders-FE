import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import {
  Users,
  Reminders,
  NewGroupMessage,
  Org,
  Dashboard,
  Group,
  Roles,
  TemplateList,
  People,
  SignUp,
  Scheduler,
  DraftList,
} from './components';

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

        {/* <Route
          exact
          path="/sms-form"
          render={props => (
            <Reminders {...props} users={this.state.reminders} />
          )}
        /> */}

        <Route exact path="/sms-form" component={Reminders} />
        <Route exact path="/schedulemessagecomposer" component={Scheduler} />

        <Route exact path="/join-org-form" component={Org} />

        <Route exact path="/join-group-form" component={Group} />

        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        <Route exact path="/dashboard" render={props => ( <Dashboard {...props} auth={this.auth} /> )}/>

        <Route exact path="/newgroupmessage" component={NewGroupMessage} />

        <Route exact path="/people" component={People} />

        <Route exact path="/select-role" component={Roles} />

        <Route exact path="/template-list" component={TemplateList} />
        <Route exact path="/draft-list" component={DraftList} />

        <Route exact path="/signup" render={props => (
            <SignUp {...props} auth={this.auth} history={this.props.history}/>)}/>

        {/* <Route exact path="/shedule-list" component={TemplateList} /> */}
      </div>
    );
  }
}

export default withRouter(App);
