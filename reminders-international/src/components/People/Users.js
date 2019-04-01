import React, { Component } from 'react';
import axios from 'axios';

import requiresAuth from '../../Auth0/Auth/requiresAuth.js';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  getUsers = () => {
    axios.get("https://reminders-international.herokuapp.com/api/users", this.state.users)
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

  //  getUserByGroup = () => {
  //   // axios.get("https://reminders-international.herokuapp.com/api/users/groups/:id", this.state.users)
  //   axios.get("http//:localhost:3000/api/users/groups/:id", this.state.users)
  //     .then(res => {
  //     //  console.log('list of students in a specific group', res.data);
  //       this.setState({
  //       users: res.data
  //       });
  //       //  console.log('getUsers this.state.users', this.state.users);
  //   })
  //   .catch(err => {
  //       console.log(err);
  //   });
  //  }


  componentDidMount() {
    this.getUsers();
    //this.getUsersByGroup();
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

