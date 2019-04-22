import React, { Component } from 'react';
import axios from 'axios';

import {
  Container,
  Form,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: null,
        email: null,
        country: null,
        phone: null,
        org_id: null,
        role_id: null,
        password: null,
        auth0_sub: null,
        // group_id: null, cannot add since it is not in the BE table
      },
      user_id: null,
      alertModal: false,
    };
  }

  addUserToGroup = () => {
    console.log("ADD USER TO GROUP", this.state)
    console.log("ADD USER TO GROUP", this.props)
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/groups/add/user`, {
        user_id: this.state.user_id,
        group_id: this.props.group_id,
      })
      .then(res => {
        console.log('adding user to group');
        console.log('adding user to group', this.state);
        console.log('adding user to group', this.props);
          this.props.history.replace('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  };

  createNewUser = () => {
    console.log("THIS.STATE.USER", this.state.user)
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/users`, this.state.user)
      .then(res => {
        console.log('UserDetailForm res', res.data[0]);
        this.setState(
          {
            user_id: res.data[0],
          },
          () => {
            this.addUserToGroup();
          },
        );
      })
      .catch(err => {
        console.log('Error creating user:', err);
      });
  };

  onHandleChanges = () => {
    this.setState({
      user: {
        name: this.full_name.value,
        email: this.email.value,
        country: this.country.value,
        phone: this.phone.value,
        org_id: this.props.org_id,
        group_id: this.props.group_id,
        role_id: this.props.role_id,
      },
      // groups: {

      // }
    });
  };

  toggleAlert = () => {
    this.setState({
      alertModal: !this.state.alertModal,
    });
  }

  handleSubmit = e => {
    console.log("ON HANDLE SUBMIT", this.state)
    console.log("ON HANDLE SUBMIT", this.props)
    console.log("ON HANDLE SUBMIT", this.full_name.value, this.email.value, this.country.value, this.phone.value)
    !this.state.user.name ||
    !this.state.user.email ||
    !this.state.user.country ||
    !this.state.user.phone
      ? this.toggleAlert()
      : this.setState(
          {
            user: {
              // id: this.props.user_id,
              name: this.full_name.value,
              email: this.email.value,
              country: this.country.value,
              phone: this.phone.value,
              org_id: this.props.org_id,
              // group_id: this.props.group_id, // not in BE table
              role_id: this.props.role_id,
              password: 'NotAPassword',
              auth0_sub: this.props.profile.sub,
            },
          },
          () => {
            this.createNewUser();
          },
        );
  };

  render() {
    return (
      <Container className="rolesContainer">
        <h3 className="rolesTopBar">Please provide your contact information</h3>
        <Form className="userWrapper">
          <FormGroup>
            <Label for="userFullName">Name</Label>
            <input
              className="detailInput"
              placeholder="First & Last"
              id="userFullName"
              ref={input => (this.full_name = input)}
              onChange={this.onHandleChanges}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userEmail">Email</Label>
            <input
              className="detailInput"
              type="email"
              placeholder="handle@address.com"
              id="userEmail"
              ref={input => (this.email = input)}
              onChange={this.onHandleChanges}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userCountry">Country</Label>
            <input
              className="detailInput"
              placeholder="Country of Residence"
              id="userCountry"
              ref={input => (this.country = input)}
              onChange={this.onHandleChanges}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userPhone">
              Phone Number (include country & area codes)
            </Label>
            <input
              className="detailInput"
              placeholder="442071838750"
              id="userPhone"
              ref={input => (this.phone = input)}
              onChange={this.onHandleChanges}
            />
          </FormGroup>
          <Button className="userBtn" onClick={this.handleSubmit}>
            Save and Continue
          </Button>{' '}
        </Form>

        <Modal
          id="alertModalWrapper"
          isOpen={this.state.alertModal}
          toggle={this.toggleAlert}
        >
          <ModalBody id="roleAlertModal">
            ALL fields are REQUIRED to proceed!
          </ModalBody>
          <ModalFooter id="alertBtn">
            <Button color="secondary" onClick={this.toggleAlert}>
              OK!
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default UserDetailsForm;
