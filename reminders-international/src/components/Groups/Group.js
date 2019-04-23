import React, { Component } from 'react';
import AddGroupForm from './AddGroupForm.js';
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Col,
} from 'reactstrap';
import axios from 'axios';
import './Group.css';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      newGroup: '',
      user_id: null,
      role_id: null,
      org_id: null,
      group_id: null,
      alertModal: false,
    };
    this.toggleAlert = this.toggleAlert.bind(this);
  }

  getGroupsFilteredByOrgId = () => {
    console.log("this.state.groups", this.state.groups)
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/groups`, this.state.groups)
      .then(res => {
        console.log("this.state.groups", this.state.groups)
        const groupsInOrg = res.data.filter(group =>  group.org_id === this.props.org_id)
        this.setState({
          groups: [...groupsInOrg],
        });
        console.log('Groups By Org', this.state.groups);
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
    !this.state.group_id || this.state.group_id === 'Select your group'
      ? this.toggleAlert()
      : this.props.handleGroup(this.state.group_id);
  };

  onHandleChange = event => {
    const group_id = parseInt(event.target.value);
    this.setState({ group_id });
  };

  componentDidMount() {
    this.getGroupsFilteredByOrgId();
  }

  render() {
    console.log('Group render this.state', this.state);
    console.log("PROPS", this.props)
    return (
      <Container className="groupsContainer">
        <h3 className="groupsTopBar">Looking to join a group? </h3>
        <Form className="groups-form">
          <FormGroup lg={8}>
            <Label for="groupName" />
            <Col className="groupInputCol"
            md={{ offset: 1, size: 10}}
            lg={{ offset: 2, size: 8}}>
            <Input 
              type="select"
              name="name"
              id="groupName"
              value={this.state.groups.name}
              onChange={this.onHandleChange}
            >
              <option>Select your group</option>
              {this.state.groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Input>
            </Col>
            <Button className="groupBtn" onClick={this.handleNext}>
              Next
            </Button>
          </FormGroup>
          {/* <FormGroup> */}
          {this.props.role === 2 ? 
          (
            <div></div>
          ) : (
            <div>
              <AddGroupForm
                org_id={this.props.org_id}
                handleGroup={this.props.handleGroup}
              />
            </div>
          )}
        </Form>

        <Modal
          id="alertModalWrapper"
          isOpen={this.state.alertModal}
          toggle={this.toggleAlert}
        >
          <ModalBody id="roleAlertModal">
            You must select a Group to proceed!
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

export default Group;