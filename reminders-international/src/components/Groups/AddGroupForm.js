import React, { Component } from 'react';
import { Container, FormGroup, Button } from 'reactstrap';
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
    const { name, user_id } = this.state.groups
    const groupObj = {
      name: name,
      user_id: user_id,
    }
    console.log("groupObj", groupObj)
    axios.post("https://reminders-international.herokuapp.com/api/groups", groupObj)
    // axios.post("https://localhost:3333/api/orgs", orgObj)
      .then(res => {
        console.log('POST RESPONSE', res);
        if(res.status === 200 || res.status === 201) {
          this.setState({
            message: 'You added a Group!!!',
            groups: { ...groupObj }
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
          <label>Group name</label> 
          <input
            onChange={this.handleInputChange}
            placeholder="example: Marketing 101"
            value={this.state.groups.name}
            name="name"
          />
          {/* <label>Country</label> 
            <input
              onChange={this.handleInputChange}
              placeholder="country"
              value={this.state.groups.name}
              name="name"
            />
          <label>Instructor</label> 
            <input
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