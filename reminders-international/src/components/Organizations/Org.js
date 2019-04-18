import React, { Component } from 'react';
// import { Link } from 'react-router';
import AddOrgForm from './AddOrgForm';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import './Org.css';

class Org extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      newOrg: '',
      user_id: null,
      role_id: null,
      org_id: null,
      group_id: null,
      
    };
  }

  getAllOrgs = () => {
    axios.get(`${process.env.REACT_APP_BACKEND}/api/orgs`, this.state.orgs)
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
    console.log("Org render this.state", this.state)
    return (
      <Container className="orgsContainer">
          <h3 className="orgsTopBar">What's the name of your organization?</h3>
      <Form className="org-form">
        <FormGroup>
          <Label for="orgName"></Label>
          <Input 
            type="select"
            name="name" 
            id="orgName" 
            value={this.state.orgs.name}
            onChange={this.onHandleChange}
          >
            <option>Select your organization</option>
            {
              this.state.orgs.map(org =>
              <option  key={org.id} value={org.id}  > 
                {org.name}</option>
              )
            } 
          </Input>
          <Button className='orgBtn' onClick={this.handleNext}>Next</Button>
        </FormGroup>

      
      {this.props.role < 3 ? (
        <div>
                    
        </div> 
      ) : (
        <>
          <AddOrgForm />
        </>
      )
      }
      </Form>
      </Container>
    );
  }
}

export default Org;