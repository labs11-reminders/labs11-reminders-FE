import React, { Component } from 'react';
import axios from 'axios';
import {
  Input,
  Form,
  FormGroup,
  Button,
  Label,
  Collapse,

} from "reactstrap";
import './SMSForm.css';

class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: ''
      },
      submitting: false,
      error: false,
      groups: [],
      collapseInd: false,
      collapseGroup: false,
    };
  }

  getAllGroups = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/api/groups`,
        this.state.groups,
      )
      .then(res => {
        this.setState({
          groups: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount(){
    this.getAllGroups();
  }

  onHandleChange = (event) => {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }

  toggleCollapseInd = () => {
    this.setState(state => ({ collapseInd: !state.collapseInd}));
  }

  toggleCollapseGroup = () => {
    this.setState(state => ({ collapseGroup: !state.collapseGroup}));
  }


  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch(`${process.env.REACT_APP_BACKEND}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
        res.json()
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    console.log("SMSForm render", this.state)
    console.log("this.props", this.props)
    return (
      <Form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
        <FormGroup>
          <Label for="messageTo">To:</Label>
            <FormGroup>
                <Button onClick={this.toggleCollapseGroup}>
                  <i className="fas fa-plus-circle" /> &nbsp; Groups
                </Button>
                <Collapse isOpen={this.state.collapseGroup}>
                  <Input
                    type="select"
                    placeholder="Select Group(s)"
                    name="group"
                    id="templateGroup"
                    onChange={this.handleInputChange}
                    value={this.state.groups.name}
                    multiple
                  >
                    <option>--&nbsp; Select Group(s)</option>
                    {this.state.groups.map(group => (
                      <option key={group.id}>{group.name}</option>
                    ))}{' '}
                  </Input>
                </Collapse> 
            </FormGroup>
          <Input
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="messageText">Write Message Here:</Label>
          <Input 
            type="textarea" 
            name="body" 
            id="messageText"
            value={this.state.message.body}
            onChange={this.onHandleChange}
            />
        </FormGroup>
        <Button type="submit" disabled={this.state.submitting}>
          Send Group Message
        </Button>
      </Form>
    );
  }
}


export default SMSForm;