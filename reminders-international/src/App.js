import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Users, Reminders } from './components';
import axios from 'axios';

import Auth from './Auth0/Auth/Auth';
import Callback from './Auth0/Callback/Callback';
import Auth0 from './Auth0/Auth0';
import Home from './Home';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      reminders: [{
        name: '',
        greeting: ''
      }],
  };
}
 auth = new Auth();

 handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    this.auth.handleAuthentication();
  }
 }

 

  getUsers = () => {
    axios.get("https://reminders-international.herokuapp.com/users", this.state.users)
      .then(res => {
      //  console.log('list of 500 users', res.data);
        this.setState({
        users: res.data
        });
        //  console.log('getUsers this.state.users', this.state.users);
    })
    .catch(err => {
        console.log(err);
    });
   }

  // This causes errors currently with auth0 loading
  // and other components because it triggers a quick succession of double renders.
  //we need to change this so that the users render but I'm not sure it should go at this level?
  // componentDidMount() {  
  //     this.getUsers();
  // }

 
  render() {
    console.log("App Render", this.state);  // Renders twice
    return  (
      <div className="App">
          <Route exact path="/" render={(props) => <Auth0 auth={this.auth} {...props} />} />
          <Route exact path="/home" render={(props) => <Home auth={this.auth} {...props} />} />
          <Route exact path="/callback" render={(props) => {
              this.handleAuthentication(props);
              return <Callback {...props} /> 
            }}/>

          <Route 
            exact path='/users' 
            render={props => <Users {...props} 
            users={this.state.users} /> } 
          />

          <Route 
            exact path='/sms-form' 
            render={props => <Reminders {...props} 
            users={this.state.reminders} /> } 
          />

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