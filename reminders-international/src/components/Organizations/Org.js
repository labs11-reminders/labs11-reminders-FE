import React, { Component } from 'react';
// import { Link } from 'react-router';
import AddOrgForm from './AddOrgForm';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import './Org.css';

class Org extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      newOrg: '',
      user_id: null,
      role_id: null,
      org_id: null,
      group_id: null,
      alertModal: false,
    };
    this.toggleAlert = this.toggleAlert.bind(this);
  }

  getAllOrgs = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/orgs`, this.state.orgs)
      .then(res => {
        this.setState({
          orgs: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  toggleAlert() {
    this.setState({
      alertModal: !this.state.alertModal,
    });
  }

  handleNext = e => {
    this.state.org_id === null ||
    this.state.org_id === 'Select your organization'
      ? this.toggleAlert()
      : this.props.handleOrg(this.state.org_id);
  };

  onHandleChange = event => {
    this.setState({ org_id: event.target.value });
  };

  componentDidMount() {
    this.getAllOrgs();
  }

  render() {
    console.log('Org render this.state', this.state);
    return (
      <Container className="orgsContainer">
        <h3 className="orgsTopBar">What's the name of your organization?</h3>
        <Form className="org-form">
          <FormGroup>
            <Label for="orgName" />
            <Input
              type="select"
              name="name"
              id="orgName"
              value={this.state.orgs.name}
              onChange={this.onHandleChange}
            >
              <option>Select your organization</option>
              {this.state.orgs.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </Input>
            <Button className="orgBtn" onClick={this.handleNext}>
              Next
            </Button>
          </FormGroup>

          {this.props.role < 3 ? (
            <div />
          ) : (
            <>
              <AddOrgForm />
            </>
          )}
        </Form>

        <Modal
          id="alertModalWrapper"
          isOpen={this.state.alertModal}
          toggle={this.toggleAlert}
        >
          <ModalBody id="roleAlertModal">
            You must select an Organization to proceed!
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

export default Org;
