import React, { Component } from 'react';
// import { Link } from 'react-router';
import AddOrgForm from './AddOrgForm';
import { Container, NavBar, Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';


class Org extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      newOrg: '',
      
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

  goHome = route => {
    this.props.history.push("/home")
  }


  onHandleChange = (event) => {
    console.log("event", event.target)
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount () {
    this.getAllOrgs()
  }

  render() {
    console.log("Org render", ...this.state.orgs)
    return (
      <Container className="Org">
      <h2>What's the name of your organization?</h2>
      <Form className = "org-form">
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
        </FormGroup>

      </Form>
      <AddOrgForm />
      </Container>
    );
  }
}

export default Org;