import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'reactstrap';
import { toast } from 'react-toastify';


class RowElement extends Component {
    constructor(props) {
        super(props);
    }

    handleAdd = e => {
        this.addUserToGroup();
    }

    addUserToGroup = () => {
        console.log('Adding user:', this.props.user.id, 'to', this.props.group_id); 
        axios.post(`${process.env.REACT_APP_BACKEND}/api/groups/add/user`, {user_id: this.props.user.id, group_id: this.props.group_id})
        .then(res => {
            this.props.getUsersByGroup_call();
            toast.info('User added to group.', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        })
        .catch(err => {
            console.log(err);
        });
    } 

    removeUserFromGroup = () => {
        console.log('Deleting user_id:', this.props.user.id, ' from group_id:', this.props.group_id);
        axios.post(`${process.env.REACT_APP_BACKEND}/api/groups/remove/user`, {user_id: this.props.user.id, group_id: this.props.group_id})
        .then(res => {
            this.props.getUsersByGroup_call();
        })
        .catch(err => {
            console.log(err);
        })
    }



    componentsDidMount(){
        this.getRoleById();
    }

    render() {
        
        return (
            <tr>                        
                <td>{this.props.user.name}</td>
                {/* <td>{this.props.user.country}</td>
                <td>{this.props.user.email}</td> */}
                <td>{this.props.user.phone}</td>
                {/* <td>{this.props.user.role_id}</td> */}
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