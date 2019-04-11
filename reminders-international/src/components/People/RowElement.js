import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'reactstrap';

class RowElement extends Component {
    constructor(props) {
        super(props);
    }

    handleAdd = e => {
        this.addUserToGroup();
    }

    addUserToGroup = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/api/groups/add/user`, {user_id: this.props.user.id, group_id: this.props.group_id})
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    } 

    removeUserFromGroup = () => {
        console.log('Deleting user_id:', this.props.user.id, ' from group_id:', this.props.group_id);
        axios.post(`${process.env.REACT_APP_BACKEND}/api/groups/remove/user`, {user_id: this.props.user.id, group_id: this.props.group_id})
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
                {
                    this.props.show_add && ( 
                        <Button color="success" onClick={this.handleAdd}>+</Button>
                    )
                }
                {
                    this.props.show_delete && (
                        <Button color="danger" onClick={this.removeUserFromGroup}>X</Button>
                    )
                }
                </td>
            </tr>
        )
    }
}

export default RowElement;