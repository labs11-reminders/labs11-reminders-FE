import React, { Component } from 'react';
import AddGroupForm from './AddGroupForm.js';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';


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
    };
  }

  getAllGroups = () => {
    axios.get("https://reminders-international.herokuapp.com/api/groups", this.state.groups)
      .then(res => {
       console.log('list of all groups', res.data);
        this.setState({
        groups: res.data
        });
         console.log('getAllGroups this.state.groups', this.state.groups);
    })
    .catch(err => {
        console.log(err);
    });
   }

   handleNext = e => {
    this.props.handleGroup(this.state.group_id);
  }


  onHandleChange = (event) => {
    console.log("event", event.target)
    this.setState({ group_id : event.target.value });
  }

  componentDidMount () {
    this.getAllGroups()
  }

  render() {
    console.log("Group render this.state", this.state)
    return (
      <Container className="Groups">
      <h2>Create a group</h2>
      <p>Once you create a group, you can invite members, send announcements, and start conversations</p>
      <Form className = "groups-form">
        <FormGroup>
        <AddGroupForm /> 
        <h3>Looking for a group? </h3>
        <label>Join a group</label>
          <Input 
            type="select" 
            name="name" 
            id="id" 
            value={this.state.groups.name}
            onChange={this.onHandleChange}            
            >
            <option></option>
            {
              this.state.groups.map(group =>
              <option key={group.id} value={group.id}  > 
                {group.name}</option>
              )
            } 
          </Input>
          <Button onClick={this.handleNext}>Next</Button>
        </FormGroup>

      </Form>
      
      </Container>
    );
  }
}

export default Group;