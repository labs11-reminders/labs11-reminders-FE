import React, { Component } from 'react';
import axios from 'axios';

import { Table, Button } from 'reactstrap';
import RowElement from './RowElement.js';

class PeopleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          group: {
            id: "2",
          }
        };
    }

    getUsersByGroup = () => {
        //group id is hardcoded in - need to change it to pull id from props
        axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/2/users`, this.state.users)
          .then(res => {  
            this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getUsersByGroup();
    }

    render() {
        return (
            <Table>
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Country</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {this.state.users.map(user => 
                   <RowElement key={user.id} value={user.id} user={user} group={this.state.group} show_delete={true} /> 
                )}
            </tbody>
            </Table>
            
        )
    }
}

export default PeopleTable;