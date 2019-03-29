import history from '../../history.js';
import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
const dotenv = require('dotenv'); 

axios.defaults.baseURL = process.env.REACT_APP_BASEURL || 'http://localhost:3000/';

axios.interceptors.request.use(
    function(options) {
        options.headers.authorization = localStorage.getItem('idToken');

        return options;
    },

    function(error) {
        console.log(error);
        return Promise.reject(error);
    }
);

export default function(Component) {
    return class Authenticated extends React.Component {

        logout() {
            this.props.auth.logout();
        }

        login() {
            this.props.auth.login();
        }

        render() {
            const token = localStorage.getItem('idToken');
            const notLoggedIn = <div>Please login to access that information.</div>;

            return <> {token ? <Component {...this.props} /> : notLoggedIn}  
            {token ? <Button onClick={this.logout.bind(this)}>Logout</Button> : <Button onClick={this.login.bind(this)}>Login</Button>} </>;

            
        }
    };
}