import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup } from 'reactstrap';
import SMSFormInd from '../SMSForm/SMSFormInd';

import axios from 'axios';

class MessageModalInd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      modal: false,
      message: {
        to: '',
        body: '',
        scheduled: false,
        draft: false,
        template: false,
        group_id: null,
        user_id: null,
        },
        submitting: false,
        error: false,
        orgs: [],
        users: [],
    };

    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }

  // TOGGLE TO OPEN MODEL
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }


    // TRYING TOGGLE FOR TYPE OF BUTTON PRESSED
    toggleTab(tab){
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        })
      }
    }


  createSavedReminder = () => {
    axios.post(`${process.env.REACT_APP_BACKEND}/api/reminders`, this.state.message)
      .then(res => {
        console.log('saving reminder');
        this.setState({
          message: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }


  onHandleChange = (event) => {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }

  toggleDraft(event, id) {
    this.setState(prevState => ({
      draft: !prevState
    }));
    this.handleChange(event,id);
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
          console.log('sending message');
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '13472633943',
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
    console.log(this.props)
    return (
      <div>
        <Button color="primary" className="convoButton" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create Message</ModalHeader>
          <ModalBody>
            <FormGroup>
              <SMSFormInd orgs={this.props.orgs}/>
            </FormGroup>
          </ModalBody>

        </Modal>
      </div>
    );
  }
}

export default MessageModalInd;