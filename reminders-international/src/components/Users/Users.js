import React, { Component } from 'react';
import axios from 'axios';

import requiresAuth from '../../Auth0/Auth/requiresAuth.js';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user_id: null,
      role_id: null,
      org_id: null,
      group_id: null,
    };
  }

  getUsers = () => {
    axios.get(`${process.env.REACT_APP_BACKEND}/api/users`, this.state.users)
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



  componentDidMount() {
    this.getUsers();
   
  }

  render() {
    console.log("Users Render:", this.state)
    return  (
      
      <div className='users-container'>
      <h3>Welcome Admin!</h3>
      <p>Here is a list of all our current students in your group</p>
        <ol>
          {this.state.users.map(user => <li key={user.id}>{user.name}: {user.email}, {user.phone}, {user.group}, {user.country}</li>)}
        </ol>
    </div>
    );
  }
}

export default requiresAuth(Users); 

