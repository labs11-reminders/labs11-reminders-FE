import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'reactstrap';

class SearchElement extends Component {
    constructor(props) {
        super(props);
    }

    handleAdd = e => {
        console.log('Add contact clicked.');
        this.addUserToGroup();
    }

    addUserToGroup = () => {
        console.log('Adding user_id:', this.props.user.id, ' to group_id:', this.props.activeGroup);
        axios.post(`${process.env.REACT_APP_BACKEND}/api/groups/add/user`, {user_id: this.props.user.id, group_id: this.props.activeGroup})
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    } 

    removeUserFromGroup = () => {
        console.log('Deleting user_id:', this.props.user.id, ' from group_id:', this.props.activeGroup);
        axios.post(`${process.env.REACT_APP_BACKEND}/api/groups/remove/user`, {user_id: this.props.user.id, group_id: this.props.activeGroup})
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <tr>                        
                <td>{this.props.user.name}</td>
                <td>{this.props.user.country}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.phone}</td>
                <td>
                
                    <Button color="success" onClick={this.handleAdd}>+</Button>
             
                </td>
            </tr>
        )
    }
}

export default SearchElement;