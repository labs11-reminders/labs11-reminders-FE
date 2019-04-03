import React, { Component } from 'react';
import axios from 'axios';

import { Table, Button } from 'reactstrap';

class PeopleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
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

    removeUserFromGroup = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/api/remove/user`, this.state.users)
        .then(res => {
            this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log(err);
        })
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
                    <tr>
                       
                        <td>{user.name}</td>
                        <td>{user.country}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td><Button color="danger" onClick={this.removeUserFromGroup}>X</Button></td>
                    </tr>
                )}
            </tbody>
            </Table>
            
        )
    }
}

export default PeopleTable;