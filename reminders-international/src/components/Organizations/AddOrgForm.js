import React, { Component } from 'react';
import { Container, FormGroup, Button, Input, Label, Collapse } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Org.css';



class AddOrgForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      message: '',
      collapse: false,
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

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState( { orgs: { ...this.state.orgs, [name]: value}})
  };

  render() {
    console.log("Add Org render", this.state)
    return (
      <FormGroup className="Add-Org-Form" onSubmit={this.addOrg}>
      <Button className="addOrgToggle" color="link" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Create new organization</Button>
      <Collapse isOpen={this.state.collapse}>
        <FormGroup>
          <Label for="addOrgName" hidden>Create new organization</Label> 
          <Input
            id="addOrgName"
            onChange={this.handleInputChange}
            placeholder="New organizational name"
            value={this.state.orgs.name}
            name="name"
          />
          </FormGroup>
          <FormGroup>
          <Label for="addOrgDescription" hidden>Description</Label> 
          <Input
            className="addOrgDescription"
            onChange={this.handleInputChange}
            placeholder="New organizational description"
            value={this.state.orgs.description}
            name="description"
          />
          <Button className='orgBtnExp' type='submit' onClick={this.addOrg}>Add New Organization</Button>
          </FormGroup>
          </Collapse>
      </FormGroup>
    );
  }
}

AddOrgForm.propTypes = {
  addOrg: PropTypes.func,
}

export default AddOrgForm;