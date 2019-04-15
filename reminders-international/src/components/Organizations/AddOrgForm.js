import React, { Component } from 'react';
import { Container, FormGroup, Button } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';



class AddOrgForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    axios.post(`${process.env.REACT_APP_BACKEND}/api/orgs`, orgObj)
      .then(res => {
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState( { orgs: { ...this.state.orgs, [name]: value}})
  };

  render() {
    console.log("Add Org render", this.state)
    return (
      <Container className="Add-Org-From" onSubmit={this.addOrg}>
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
      </Container>
    );
  }
}

AddOrgForm.propTypes = {
  addOrg: PropTypes.func,
}

export default AddOrgForm;