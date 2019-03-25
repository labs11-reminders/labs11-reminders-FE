import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Users } from './components';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Welcome to Reminders International</p>
        </header>
        <Switch>
          <Route 
            exact path='/users' 
            render={props => <Users {...props} users={this.state.users} /> } 
          />
        </Switch>
      </div>
    );
  }
}


export default withRouter(App);
