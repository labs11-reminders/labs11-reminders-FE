import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from "react-router-dom"; // ADDED DOUBLE QUOTES - then appears to worked? 

ReactDOM.render(
  <Router>
    <App />
  </Router>, 
  document.getElementById('root')
  );



 