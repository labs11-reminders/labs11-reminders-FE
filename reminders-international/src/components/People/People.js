import React, { Component } from 'react';
import axios from 'axios';

import requiresAuth from '../../Auth0/Auth/requiresAuth.js';
import SearchBar from './SearchBar.js';
import PeopleTable from './PeopleTable.js';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
    }


    render() {
        return (
            <div>
                <SearchBar/>
                <PeopleTable/>

            </div>
           
        );
    }
}

export default People;