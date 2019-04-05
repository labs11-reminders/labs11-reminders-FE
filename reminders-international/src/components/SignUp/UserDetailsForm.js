import React, { Component } from 'react';
import axios from 'axios';

import { InputGroup, InputGroupAddon,  Input, Button } from 'reactstrap';

class UserDetailsForm extends Component {
    constructor(props) {
        super(props);
            this.state = {
                user: {},
            };    
    }

    addUserToGroup = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/api/groups/add/user`, {user_id: this.state.user_id, group_id: this.props.group_id})
        .then(res => {
            console.log('adding user to group');
            this.props.history.replace('/dashboard');
        })
        .catch(err => {
            console.log(err);
        });
    } 

    createNewUser = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/api/users`, this.state.user)
            .then(res=> {
                
                this.setState({
                    user_id: res.data[0]
                }, () => {
                    this.addUserToGroup()
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    onHandleChanges = () => {
        this.setState({ user: {
            name: this.full_name.value,
            email: this.email.value,
            country: this.country.value,
            phone: this.phone.value,
            org_id: this.props.org_id,
            role_id: this.props.role_id,
            }    
        }); 
      }

    handleSubmit = e => {
        this.setState({ user: {
            name: this.full_name.value,
            email: this.email.value,
            country: this.country.value,
            phone: this.phone.value,
            org_id: this.props.org_id,
            role_id: this.props.role_id,
            password: 'NotAPassword',
            auth0_sub: this.props.profile.sub
            }    
        }, () => {   
        this.createNewUser(); 
    });
    }

    render() {
        return (
           <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>
                        <input placeholder="First & Last" ref={input => this.full_name = input} onChange={this.onHandleChange}/>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                        <input placeholder="@address.com" ref={input => this.email = input} onChange={this.onHandleChange}/>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Country</InputGroupAddon>
                        <input placeholder="of Residence" ref={input => this.country = input} onChange={this.onHandleChange}/>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">Phone</InputGroupAddon>
                        <input placeholder="Number" ref={input => this.phone = input} onChange={this.onHandleChange} />
                </InputGroup>
                <Button color="primary" onClick={this.handleSubmit}>Save and Continue</Button>{' '}
           </div> 
        )
    }
}

export default UserDetailsForm;