import React, { Component } from 'react';
import { Container, FormGroup, 
  Input, Button, Label } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';



class CreateGroupAlt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      groups: [],
      message: '',

      // Need to update
      todos: {
        group_code: [],
        organization: [],
        country: [],
      }
    };
  }

  getAllOrgs = () => {
    axios.get("https://reminders-international.herokuapp.com/api/orgs", this.state.orgs)
    // axios.get("https://localhost:3333/api/orgs", this.state.orgs)
      .then(res => {
       console.log('list of all orgs', res.data);
        this.setState({
        orgs: res.data
        });
         console.log('getAllOrgs this.state.orgs', this.state.orgs);
    })
    .catch(err => {
        console.log(err);
    });
   }

  addGroup = event => {
    event.preventDefault();
    const { name } = this.state.groups;
    const groupObj = {
      name: name,
    }
    // const { group_code, organization, country } = this.state.todos;
    console.log("groupObj", groupObj)
    // console.log("this.state.todos", group_code)
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

  componentDidMount () {
    this.getAllOrgs()
  }

  render() {
    console.log("Add Group render", this.state)
    return (
      <Container className="CreateGroupAlt" onSubmit={this.addGroup}>
        <h1>Create a Group</h1>
      <img src="https://tk-assets.lambdaschool.com/ecd33d34-c124-4b75-92d2-e5c52c171ed8_11201517_887808411287357_1307163552_a.jpg" alt="philzcoffee's thumbnail" className="user-thumbnail" />
      <p>Edit icons</p>
        <FormGroup>
          <Label>Group name</Label> 
          <Input
            onChange={this.handleInputChange}
            placeholder="example: Peru January Cohort"
            value={this.state.groups.name}
            name="name"
          />
          </FormGroup>
          <FormGroup>
          <Label>Group code</Label> 
            <Input
              placeholder="example: @ Peru1"
              name="groupCode"
            />
            </FormGroup>
            <FormGroup>
          <Label>Organization</Label> 
          <Input 
            type="select" 
            name="organization" 
            id="id"        
            >
            {
              this.state.orgs.map(org =>
              <option key={org.id}  > 
                {org.name}</option>
              )
            }  
          </Input>
          </FormGroup>
          <FormGroup>
          <Label>Country</Label>
            <Input
              placeholder="country"
              name="country"
            />

          <Button type='submit' onClick={this.addGroup}>Create</Button>
        </FormGroup>
      </Container>
    );
  }
}
// value={this.state.todos.group_code}
// onChange={this.handleInputChange}

// value={this.state.orgs.name}
// onChange={this.onHandleChange}
// value={org.value}

// value={this.state.todos.country}
// onChange={this.handleInputChange}



CreateGroupAlt.propTypes = {
  addGroup: PropTypes.func,
}

export default CreateGroupAlt;