import React, { Component } from 'react';
import AddGroupForm from './AddGroupForm.js';
import { Container, NavBar, Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';


class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      newGroup: '',
      
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

  goHome = route => {
    this.props.history.push("/home")
  }


  onHandleChange = (event) => {
    console.log("event", event.target)
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount () {
    this.getAllGroups()
  }

  render() {
    console.log("Group render", ...this.state.groups)
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
            {
              this.state.groups.map(group =>
              <option key={group.id} value={group.value}  > 
                {group.name}</option>
              )
            } 
          </Input>
          <Button onClick={this.goHome}>My Dashboard</Button>
        </FormGroup>

      </Form>
      
      </Container>
    );
  }
}

export default Group;