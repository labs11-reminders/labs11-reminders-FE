import React, { Component } from 'react';
// import { Link } from 'react-router';
import AddOrgForm from './AddOrgForm';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';
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
        this.setState({
        orgs: res.data
        });
    })
    .catch(err => {
        console.log(err);
    });
   }

  handleNext = e => {
    this.props.handleOrg(this.state.org_id);
  }

  onHandleChange = (event) => {
    console.log("event", event.target)
    this.setState({ org_id : event.target.value });
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
            value={this.state.orgs.name}
            onChange={this.onHandleChange}            
            >
            <option></option>
            {
              this.state.orgs.map(org =>
              <option key={org.id} value={org.id}  > 
                {org.name}</option>
              )
            } 
          </Input>
          <Button onClick={this.handleNext}>Next</Button>
        </FormGroup>

      </Form>
      <AddOrgForm />
      </Container>
    );
  }
}

export default Org;