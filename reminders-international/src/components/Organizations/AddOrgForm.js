import React, { Component } from 'react';
// import { Link } from 'react-router';
import { Container, NavBar, Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';



class AddOrgForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // orgs: {...newOrg},
      orgs: [],
      message: '',
    };
  }

  addOrg = event => {
    event.preventDefault();
    const { name, description } = this.state.orgs
    const orgObj = {
      name: name,
      description: description,
    }
    console.log("orgObj", orgObj)
    axios.post("https://reminders-international.herokuapp.com/api/orgs", orgObj)
    // axios.post("https://localhost:3333/api/orgs", orgObj)
      .then(res => {
        console.log('POST RESPONSE', res);
        if(res.status === 200 || res.status === 201) {
          this.setState({
            message: 'You added an Org!!!',
            orgs: { ...orgObj }
            });
        }
          console.log('addOrgs this.state.org', this.state.orgs);
    })
    .catch(err => {
        console.log(err);
        this.setState({
          message: 'You failed to add an org.',
          orgs: { ...orgObj }
          });
    });
  }

  // goHome = route => {
  //   this.props.history.push("/home")
  // }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState( { orgs: { ...this.state.orgs, [name]: value}})
  };

  render() {
    console.log("Add Org render", this.state)
    return (
      <Container className="Add-Org-From" onSubmit={this.addOrg}>
      {/* <Form className = "org-form">
        <FormGroup>
          <Input 
            type="select" 
            name="name" 
            id="id" 
            placeholder="type the name of your organization here"
            value={this.state.orgs.name}
            onChange={this.onHandleChange}            
            >
            {
              this.state.orgs.map(org =>
              <option key={org.id} value={org.value}  > 
                {org.name}</option>
              )
            } 
          </Input>
          <Button onClick={this.goHome}>My Dashboard</Button>
        </FormGroup> */}
        <FormGroup>
          <p>Can't find your organization?</p> 
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.orgs.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="description"
            value={this.state.orgs.description}
            name="description"
          />
          <Button type='submit' onClick={this.addOrg}>Add it here</Button>
        </FormGroup>
        
      {/* </Form> */}
      </Container>
    );
  }
}

AddOrgForm.propTypes = {
  addOrg: PropTypes.func,
}

export default AddOrgForm;