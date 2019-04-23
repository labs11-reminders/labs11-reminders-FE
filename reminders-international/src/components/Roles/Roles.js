import React, { Component } from 'react';
import './Roles.css';
import {
  Container,
  Card,
  Button,
  Col,
  Row,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import student from './student.svg';
import teacher from './teacher.svg';
import countryManager from './leader.svg';
import boardMember from './donation.svg';


class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRole: null,
      alertModal: false,
    };
  }

  toggle = role => {
    if (this.state.activeRole !== role) {
      this.setState({
        activeRole: role,
      });
    }
  };

  toggleAlert = () => {
    this.setState({
      alertModal: !this.state.alertModal,
    });
  }

  handleNext = e => {
    !this.state.activeRole
      ? this.toggleAlert()
      : this.props.handleRole(this.state.activeRole);
  };

  render() {
    console.log(this.state.activeRole);
    return (
      <Container className="rolesContainer">
        <h3 className="rolesTopBar">Select your Role</h3>
        <Row className="rolesWrapper">
          <Col className="roleCol" xs={12} sm={6} md={6} lg={3}>
            <Card className="roleCard">
              <Button
                id={this.state.activeRole === 1 ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle(1);
                }}
              >
                <img className="SVG" src={teacher} alt="Teacher" />
                <Label for="Teacher">Teacher</Label>
              </Button>
            </Card>
          </Col>

          <Col className="roleCol" xs={12} sm={6} md={6} lg={3}>
            <Card className="roleCard">
              <Button
                id={this.state.activeRole === 2 ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle(2);
                }}
              >
                <img className="SVG" src={student} alt="Student" />
                <Label for="Student">Student</Label>
              </Button>
            </Card>
          </Col>

          <Col className="roleCol" xs={12} sm={6} md={6} lg={3}>
            <Card className="roleCard">
              <Button
                id={this.state.activeRole === 3 ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle(3);
                }}
              >
                <img
                  className="SVG"
                  src={countryManager}
                  alt="Country Manager"
                />
                <Label for="countryManager">Country Manager</Label>
              </Button>
            </Card>
          </Col>
          <Col className="roleCol" xs={12} sm={6} md={6} lg={3}>
            <Card className="roleCard">
              <Button
                id={this.state.activeRole === 4 ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle(4);
                }}
              >
                <img className="SVG" src={boardMember} alt="Board Member" />
                <Label for="boardMember">Board Member</Label>
              </Button>
            </Card>
          </Col>
        </Row>
        <Button className="roleBtn" id="size" onClick={this.handleNext}>
          Next
        </Button>

        <Modal
          id="alertModalWrapper"
          isOpen={this.state.alertModal}
          toggle={this.toggleAlert}
        >
          <ModalBody id="roleAlertModal">
            You must select a role to proceed!
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

export default Roles;