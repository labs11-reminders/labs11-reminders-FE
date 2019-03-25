// In components/index.js
import Users from './Users';

export { Users };

// In components/Users.js
import React from 'react';

const User = props => {
  console.log(props)


  return  (
  <div className='users'>
    <h3>Welcome {props.user.username}!</h3>
    <p>Contact information:</p>
      <ol>
        {props.users.map(user => <li key={user.id}>{user.username}: {props.user.email}, {props.user.phone}, {props.user.country}</li>)}
      </ol>
  </div>
);
  }

export default User; 


// In App.js
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