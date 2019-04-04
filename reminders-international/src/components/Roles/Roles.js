import React, { Component } from 'react';
import './Roles.css';

import { Card, Button, Col } from 'reactstrap';

class Roles extends Component {
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

export default Roles;
