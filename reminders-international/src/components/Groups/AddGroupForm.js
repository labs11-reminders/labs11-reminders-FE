import React, { Component } from 'react';
import { Container, FormGroup, Button, Input, Label, Collapse } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Group.css';



class AddGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      message: '',
      collapse: false,
    };
  }

  addGroup = event => {
    event.preventDefault();
    console.log("Add Group this.props.org_id", this.props.org_id)
    const { name } = this.state.groups
    const groupObj = {
      name: name,
      org_id: this.props.org_id,
    }
    axios.post(`${process.env.REACT_APP_BACKEND}/api/groups`, groupObj)
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

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState( { groups: { ...this.state.groups, [name]: value}})
  };

  render() {
    console.log("Add Group render", this.state)
    return (
        <FormGroup className="Add-Group-Form" onSubmit={this.addGroup}>
        <Button className="addGroupToggle" color="link" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Create new group</Button>
        <Collapse isOpen={this.state.collapse}>
        <p>Once you create a new group, you can invite members, send announcements, and start conversations.</p>
        <FormGroup>
          <Label for="addGroupName" hidden>Create new group</Label> 
          <Input
            id="addGroupName"
            onChange={this.handleInputChange}
            placeholder="New group name"
            value={this.state.groups.name}
            name="name"
          />
          <Button className='groupBtnExp' type='submit' onClick={this.addGroup}>Add New Group</Button>
          </FormGroup>
          </Collapse>
        </FormGroup>
    );
  }
}

AddGroupForm.propTypes = {
  addGroup: PropTypes.func,
}

export default AddGroupForm;