import React from 'react';

const Users = props => {
  console.log("PROPS", props.users) // renders twice




 // getUsers = () => {
  //   axios.get("https://reminders-international.herokuapp.com/users", this.state.users)
  //     .then(res => {
  //     //  console.log('list of 500 users', res.data);
  //       this.setState({
  //       users: res.data
  //       });
  //       //  console.log('getUsers this.state.users', this.state.users);
  //   })
  //   .catch(err => {
  //       console.log(err);
  //   });
  //  }


  return  (
  <div className='users-container'>
    <h3>Welcome Admin!</h3>
    <p>Here is a list of all our current students and pertinent contact information:</p>
      <ol>
        {props.users.map(user => <li key={user.id}>{user.name}: {user.email}, {user.phone}, {user.country}</li>)}
      </ol>
  </div>
);
  }

export default Users; 

