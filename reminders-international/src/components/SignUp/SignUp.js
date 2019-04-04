import React, { Component } from 'react';
import axios from 'axios';
import Roles from "../Roles/Roles.js"
import Org from "../Organizations/Org.js";
import Group from "../Groups/Group.js";
import AddGroupForm from "../Groups/AddGroupForm.js";
import AddOrgForm from "../Organizations/AddOrgForm.js";


import { Table, Button } from 'reactstrap';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            role_id: null,
            org_id: null,
            group_id: null,
        }
    };

    componentWillMount() {
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile });
          });
        } else {
          this.setState({ profile: userProfile });
        }
    }

    //sub: "google-oauth2|116880671363670736349"

    handleNext = e => {
        this.nextStep();
    }

    nextStep = () => {
        this.setState({
            step: this.state.step+1
        })
    }

    handleRole = (role_id) => {
        this.setState({ role_id: role_id });
        this.nextStep();
    }

    handleOrg = (org_id) => {
        this.setState({ org_id: org_id });
        this.nextStep();
    }

    handleGroup = (group_id) => {
        this.setState({ group_id: group_id });
        this.nextStep();
    }

    render() {
        return (
            <div>
                <p>You are on step {this.state.step} of account creation.</p>
                
                {
                    this.state.step == 1 && (
                        <div>
                        <Roles handleRole={this.handleRole} />
                        </div>
                    )
                }
                {
                    this.state.step == 2 && (
                        <div>
                        <Org handleOrg={this.handleOrg}/>                        
                        </div>
                    )
                }
                { 
                    this.state.step == 3 && (
                        <div>
                        <Group handleGroup={this.handleGroup}/>
                        </div>
                    )
                }
                { 
                    this.state.step == 4 && (
                        <div>
                        <p>Role id: {this.state.role_id}</p>
                        <p>Org id: {this.state.org_id}</p>
                        <p>Group id: {this.state.group_id}</p>
                        </div>
                    )
                }

            </div>
        )
    }
}

export default SignUp;