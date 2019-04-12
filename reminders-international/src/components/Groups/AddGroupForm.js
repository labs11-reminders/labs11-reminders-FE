import React, { Component } from 'react';
import { Container, FormGroup, Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';



class AddGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      message: '',
    };
  }

  addGroup = event => {
    event.preventDefault();
    const { name, org_id } = this.state.groups
    const groupObj = {
      name: name,
      org_id: this.props.org_id,
    }
    console.log("groupObj", groupObj)
    axios.post(`${process.env.REACT_APP_BACKEND}/api/groups`, groupObj)
    // axios.post("https://localhost:3333/api/orgs", orgObj)
      .then(res => {
        console.log('POST RESPONSE', res.data);
        if(res.status === 200 || res.status === 201) {
          this.setState({
            message: 'You added a Group!!!',
            groups: { ...groupObj }
            }, () => {
              this.props.handleGroup(res.data);
            });
        }
          console.log('addGroup this.state.groups', this.state.groups);
    })
    .catch(err => {
        console.log(err);
        this.setState({
          message: 'You failed to add a group.',
          orgs: { ...groupObj }
          });
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState( { groups: { ...this.state.groups, [name]: value}})
  };

  render() {
    console.log("Add Group render", this.state)
    return (
      <Container className="Add-Group-From" onSubmit={this.addGroup}>
        <FormGroup>
          <Label>Group name</Label> 
          <Input
            onChange={this.handleInputChange}
            placeholder="example: Marketing 101"
            value={this.state.groups.name}
            name="name"
          />
          {/* <Label>Country</Label> 
            <Input
              onChange={this.handleInputChange}
              placeholder="country"
              value={this.state.groups.name}
              name="name"
            />
          <Label>Instructor</Label> 
            <Input
              onChange={this.handleInputChange}
              placeholder="example: Jane Doe"
              value={this.state.groups.name}
              name="name"
            /> */}

          <Button type='submit' onClick={this.addGroup}>Create</Button>
        </FormGroup>
      </Container>
    );
  }
}

AddGroupForm.propTypes = {
  addGroup: PropTypes.func,
}

export default AddGroupForm;