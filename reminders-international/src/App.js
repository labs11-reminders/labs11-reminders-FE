import React, { Component } from 'react';
import { Route, withRouter, Router } from 'react-router-dom';
// import axios from 'axios';

import Auth from './Auth0/Auth/Auth';
import Callback from './Auth0/Callback/Callback';
import Auth0 from './Auth0/Auth0';
import Home from './Home';
import Home2 from './Home2';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      
  };
}
 auth = new Auth();

 handleAuthentication = ({location}) => {
  console.log(location);
  console.log(location.error);
  if (/access_token|id_token|error/.test(location.hash)) {
    this.auth.handleAuthentication();
  }
}

 
/*
  getUsers = () => {
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
  
  componentDidMount() {
    this.getUsers();
    
  }
*/
 
  render() {
    console.log(this.state);
    
    return  (
    <div className="App">
      <Route exact path="/reminders" />
      {/* <Route path="/home2" render={(props) => <Home2 auth={this.auth} {...props} />} /> */}
      {/* <Route path="/home" render={(props) => <Home auth={this.auth} {...props} />} /> */}
      {/* <Route path="/callback" render={(props) => { */}
          {/* this.handleAuthentication(props);
          return <Callback {...props} /> 
        }}/> */}
    </div>
  );
}

}

export default withRouter(App);


  // <div className='users'>
    //   <Auth />
    //   <h3>Welcome to Reminders International!</h3>
    //   <p>Contact information:</p>
    //     <ol>
    //      {this.state.users.map(user => <li key={user.id}>{user.name}: {user.email}, {user.phone}, {user.country}</li>)}
    //     </ol>
    // </div>

    /* 
    
    <Auth0 //auth={this.auth} --I'm not sure we need this? This was an add on at lunch to fix what I thought was a props issue
      />
      
      <Route path="/" render={(props) => <App auth={this.auth} {...props} />} />
      */