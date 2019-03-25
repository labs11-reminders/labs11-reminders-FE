import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Users } from './components';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      
  };
}

  componentDidMount() {
    axios.get("https://reminders-international.herokuapp.com/users", this.state.users)
    .then(res => {
      console.log(res.data.users);
      console.log('getting users');
      this.setState({
        users: res.data
      });
      console.log('hello');
      console.log(this.state.users);
    })
    .catch(err => {
      console.log(err);
    });

  }

  
  render() {
      console.log(this.state);
    return  (
      
      <div className='users'>
        <h3>Welcome to Reminders International!</h3>
        <p>Contact information:</p>
          <ol>
           {this.state.users.map(user => <li key={user.id}>{user.name}: {user.email}, {user.phone}, {user.country}</li>)}
          </ol>
        
        
      </div>
    
    

   
      // <div className="App">
      //   <header className="App-header">
      //     <p>
      //       Welcome to Reminders International
      //     </p>
      //   </header>
      // </div>
    );
  }

}



export default withRouter(App);
