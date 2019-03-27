import React from 'react';

const Users = props => {
  console.log("PROPS", props.users) // renders twice
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

