import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to Reminders International
          </p>
        </header>
      </div>
    );
  }
}


export default withRouter(App);
