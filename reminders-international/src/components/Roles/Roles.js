import React, { Component } from 'react';
import './Roles.css';
// import styled from 'styled-components';
import { Container, Card, Button, Col, Row, Label } from 'reactstrap';
// import logo from './logo.svg';
import student from './student.svg';
import teacher from './teacher.svg';
import countryManager from './leader.svg';
import boardMember from './donation.svg';
// reminders-international/src/components/Roles/Roles.js

class Roles extends Component {
  state = {
    activeRole: null,
  };

  toggle = role => {
    if (this.state.activeRole !== role) {
      this.setState({
        activeRole: role,
      });
    }
  }

  handleNext = e => {
    this.props.handleRole(this.state.activeRole);
  }

  render() {
    console.log(this.state.activeRole);
    return (
      <Container className="rolesContainer" >
      
        <h3 className="rolesTopBar">What's your role at Reminders International? </h3>
        <Row className="rolesWrapper" >
          <Col className="roleCol" xs={12} sm={6} md={6} lg={3}>
            <Card className="roleCard">
              <Button
                id={this.state.activeRole === '1' ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle('1');
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
                id={this.state.activeRole === '2' ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle('2');
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
                id={this.state.activeRole === '3' ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle('3');
                }}
              >
              <img className="SVG" src={countryManager} alt="Country Manager" />
                <Label for="countryManager">Country Manager</Label>
              </Button>
            </Card>
          </Col>
          <Col className="roleCol" xs={12} sm={6} md={6} lg={3}>
            <Card className="roleCard">
              <Button
                id={this.state.activeRole === '4' ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle('4');
                }}
              >
                <img className="SVG" src={boardMember} alt="Board Member" />
                <Label for="boardMember">Board Member</Label>
              </Button>
            </Card>
          </Col>
        </Row>
        <Button className="roleBtn" id="size" onClick={this.handleNext}>Next</Button>
      </Container>
    );
  }
}

export default Roles;

{/*class Roles extends Component {
  state = {
    activeRole: null,
  };

  toggle(role) {
    if (this.state.activeRole !== role) {
      this.setState({
        activeRole: role,
      });
    }
  }

  handleNext = e => {
    this.props.handleRole(this.state.activeRole);
  }

  render() {
    console.log(this.state.activeRole);
    return (
      <div className="rolesContainer">
        <h2>Tell us who you are!</h2>
        <main className="rolesWrapper">
          <Col sm="6">
            <Card body className="roleCard">
              <Button
                id={this.state.activeRole === '1' ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle('1');
                }}
              >
                Teacher
              </Button>
              <p id="cardText">Mentor, trainer, coordinator, etc</p>
            </Card>
          </Col>

          <Col sm="6">
            <Card body className="roleCard">
              <Button
                id={this.state.activeRole === '2' ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                Student
              </Button>
              <p id="cardText">Client, learner, beneficiary, etc</p>
            </Card>
          </Col>

          <Col sm="6">
            <Card body className="roleCard">
              <Button
                id={this.state.activeRole === '3' ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle('3');
                }}
              >
                Country Manager
              </Button>
            </Card>
          </Col>
          <Col sm="6">
            <Card body className="roleCard">
              <Button
                id={this.state.activeRole === '4' ? 'activeBtn' : 'roleBtn'}
                onClick={() => {
                  this.toggle('4');
                }}
              >
                Board Member
              </Button>
            </Card>
          </Col>
        </main>
        <Button id="size" onClick={this.handleNext}>Next</Button>
      </div>
    );
  }
}

export default Roles;*/}
