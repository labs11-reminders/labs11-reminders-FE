import React, { Component } from 'react';



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