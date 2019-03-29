import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {  }
    }
    render() { 
      console.log("Home Render this.state", this.state)
      return ( 
        <div>You're logged in!</div>
      );
    }
  }
   
  export default Home;
  