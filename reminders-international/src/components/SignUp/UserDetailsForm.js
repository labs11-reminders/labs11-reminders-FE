import React, { Component } from 'react';
import axios from 'axios';

import { Form, FormGroup, Label, Button } from 'reactstrap';

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
                console.log("UserDetailForm res", res)
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
            // group_id: this.props.group_id,
            role_id: this.props.role_id,
            },
            // groups: {

            // }
        }); 
      }

    handleSubmit = e => {
        this.setState({ user: {
            name: this.full_name.value,
            email: this.email.value,
            country: this.country.value,
            phone: this.phone.value,
            org_id: this.props.org_id,
            // group_id: this.props.group_id,
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
            <Form>
                <FormGroup>
                    <Label for="userFullName">Name</Label>
                        <input 
                            placeholder="First & Last"
                            id="userFullName"
                            ref={input => this.full_name = input} 
                            onChange={this.onHandleChanges}/>
                </FormGroup>
                <FormGroup>
                    <Label for="userEmail">Email</Label>
                        <input 
                            placeholder="handle@address.com"
                            id="userEmail" 
                            ref={input => this.email = input} 
                            onChange={this.onHandleChanges}/>
                </FormGroup>
                <FormGroup>
                    <Label for="userCountry">Country</Label>
                        <input 
                            placeholder="Country of Residence"
                            id="userCountry"
                            ref={input => this.country = input} 
                            onChange={this.onHandleChanges}/>
                </FormGroup>
                <FormGroup>
                    <Label for="userPhone">Phone Number (include country & area codes)</Label>
                        <input 
                            placeholder="442071838750"
                            id="userPhone"
                            ref={input => this.phone = input} 
                            onChange={this.onHandleChanges} />
                </FormGroup>
                <Button color="primary" onClick={this.handleSubmit}>Save and Continue</Button>{' '}
           </Form> 
        )
    }
}

export default UserDetailsForm;