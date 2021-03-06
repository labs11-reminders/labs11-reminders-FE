import React, { Component } from 'react';
import Roles from '../Roles/Roles.js';
import Org from '../Organizations/Org.js';
import Group from '../Groups/Group.js';
import UserDetailsForm from './UserDetailsForm.js';
import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      role_id: null,
      org_id: null,
      group_id: null,
      user_id: null,
    };
  }

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

  handleNext = e => {
    this.nextStep();
  };

  nextStep = () => {
    console.log('SignUp.js NEXT STEP', this.state);
    
    this.setState({
      step: this.state.step + 1,
    });
  };

  handleRole = role_id => {
    this.setState({ role_id: role_id });
    this.nextStep();
  };

  handleOrg = org_id => {
    this.setState({ org_id: org_id });
    this.nextStep();
  };

  handleGroup = group_id => {
    this.setState({ group_id: group_id });
    this.nextStep();
  };

  handleUser = user => {
    this.setState({ user: user });
  };

  render() {
    console.log('SignUp.js render this.state', this.state);

    return (
      
      <div className="signupContainer">
        {/* <p>You are on step {this.state.step} of account creation.</p> */}

        <section className="signup-stepper">
          <p>
            <span className={this.state.step === 1 ? 'dot-active' : 'dot'} />
            <span className={this.state.step === 2 ? 'dot-active' : 'dot'} />
            <span className={this.state.step === 3 ? 'dot-active' : 'dot'} />
            <span className={this.state.step === 4 ? 'dot-active' : 'dot'} />
          </p>
        </section>

        {this.state.step === 1 && (
          <div>
            <Roles 
              handleRole={this.handleRole} 
              profile={this.state.profile}
            />
            
          </div>
        )}
        {this.state.step === 2 && (
          <div>
            <Org 
              handleOrg={this.handleOrg} 
              role={this.state.role_id} 
              profile={this.state.profile}
            />
          </div>
        )}
        {this.state.step === 3 && (
          <div>
            <Group
              handleGroup={this.handleGroup}
              role={this.state.role_id}
              org_id={this.state.org_id}
              profile={this.state.profile}
            />
          </div>
        )}
        {this.state.step === 4 && (
          <div>
            <UserDetailsForm
              role_id={this.state.role_id}
              org_id={this.state.org_id}
              group_id={this.state.group_id}
              history={this.props.history}
              profile={this.state.profile}
              auth={this.props.auth}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SignUp;
