import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"; // ADDED DOUBLE QUOTES - then appears to worked? 

import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>, 
  document.getElementById('root')
  );