import React, { Component } from 'react';
import {
  Input,
  Form,
  FormGroup,
  Button,
  Label
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
      error: false
    };
  }

  onHandleChange = (event) => {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
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
    return (
      <Form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
        <FormGroup>
          <Label htmlFor="to">To:</Label>
          <Input
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="body">Body:</Label>
          <Input 
            name="body" 
            id="body"
            value={this.state.message.body}
            onChange={this.onHandleChange}
          />
        </FormGroup>
        <Button type="submit" disabled={this.state.submitting}>
          Send message
        </Button>
      </Form>
    );
  }
}


export default SMSForm;