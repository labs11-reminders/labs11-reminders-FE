import React, { Component } from 'react';
import axios from 'axios';

import { Table, Button } from 'reactstrap';

class SearchTable extends Component {
    constructor(props) {
        super(props);
    }


    removeUserFromGroup = () => {
        axios.get("https://localhost:3000/api/remove/user", this.state.users)
        .then(res => {
            this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    emptyTable = () => {
        if (this.props.users.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    
    render() {
        return (
            <div>
            {
                this.emptyTable() && (
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
                
                {this.props.users.map(user => 
                    <tr>
                       
                        <td>{user.name}</td>
                        <td>{user.country}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td><Button color="success" onClick={this.removeUserFromGroup}>+</Button></td>
                    </tr>
                )}
            </tbody>
            </Table>
                )}
                </div>
        )
    }
}

export default SearchTable;