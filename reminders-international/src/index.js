

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'; // switched to just Router which resolved callback refresh on auth
import history from './history';

import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

require('dotenv').config();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>, 
  document.getElementById('root')
  );