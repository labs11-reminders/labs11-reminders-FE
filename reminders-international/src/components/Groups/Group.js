import React, { Component } from 'react';
import AddGroupForm from './AddGroupForm.js';
import { Container, Form, FormGroup, Input, Button, Label } from 'reactstrap';
import axios from 'axios';
import './Group.css';

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
    axios.get(`${process.env.REACT_APP_BACKEND}/api/groups`, this.state.groups)
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
       <Container className="groupsContainer">
        <h3 className="groupsTopBar">Looking to join a group? </h3>
        <Form className="groups-form">
          <FormGroup>
            <Label for="groupName"></Label>
            <Input 
              type="select" 
              name="name" 
              id="groupName" 
              value={this.state.groups.name}
              onChange={this.onHandleChange}
            >
            <option>Select your group</option>
              {
                this.state.groups.map(group =>
                <option key={group.id} value={group.id}  > 
                  {group.name}</option>
                )
              } 
          </Input>
          <Button className="groupBtn" onClick={this.handleNext}>Next</Button>
        </FormGroup>  
        {/* <FormGroup> */}
        {this.props.role === 2 ? (
          <div></div>
        ) : (
          <div>
          <AddGroupForm org_id={this.props.org_id} handleGroup={this.props.handleGroup}/>
          </div>
            

            

            
        )
        }
        
        </Form>
      </Container>
     
    );
  }
}

export default Group;

              {/* <FormGroup>
              <AddGroupForm org_id={this.props.org_id} handleGroup={this.props.handleGroup}/>
              </FormGroup> */}
              {/* </FormGroup> */}