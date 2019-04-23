import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'; // switched to just Router which resolved callback refresh on auth

import history from './history';

import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
// import Auth from './Auth0/Auth/Auth';
// const auth = new Auth();
// auth={auth}
require('dotenv').config();

ReactDOM.render(
  <Router 
  history={history}
  
  >
    <App />
  </Router>, 
  document.getElementById('root')
  );