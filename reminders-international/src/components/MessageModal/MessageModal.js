import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import SMSForm from '../SMSForm/SMSForm';

import axios from 'axios';

class MessageModal extends React.Component {
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
        group_id: '',
        user_id: '',
      },
      submitting: false,
      error: false
    };

    this.toggle = this.toggle.bind(this);
  }

  // getUserData = () => {
  //   axios.get(`${process.env.REACT_APP_BACKEND}/api/users/data/${id}`, this.state.user.id)
  //     .then(res => {
  //       this.setState({
  //         user: res.data
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

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



  // toggleSavedAsDraft() {
  //   this.setState(prevState => ({
  //     draft: !prevState.draft })), () => {
  //      this.createSavedReminder();
  //   };
  // }

  // toggleSavedAsTemplate() {
  //   this.setState(prevState => ({
  //     template: !prevState.template
  //   })), () => {
  //     this.createSavedReminder()
  //   };
  // }

  // toggleSavedAsTemplate() {
  //   this.setState(prevState => ({
  //     scheduled: !prevState.scheduled
  //   })), () => {
  //     this.createSavedReminder()
  //   };
  // }

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
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create a Message</ModalHeader>
          <ModalBody>
            <FormGroup>
              {/* <Label for="messageText">Write Message Here</Label> */}
              {/* <Input type="textarea" name="body" id="messageText"/> */}
              <SMSForm/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save Draft</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Schedule</Button>{/* <---- toggle scheduled to true, and direct user to scheduled component*/}
            <Button color="secondary" onClick={this.onSubmit}>Send</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MessageModal;


/*   ------ Edit  handlers triggered in ScheduledMessageCard --------

      onEditTitle  = (event, id) => {
        const title_input = event.target.getAttribute('title');
        this.setState({
          title: { ...this.state.title, [title_input]: event.target.value }
        });
        this.handleChange(event,id);
      }
      onEditMessage = (event, id) => {
        const message_input = event.target.getAttribute('message');
        this.setState({
          message: { ...this.state.message, [message_input]: event.target.value }
        });
        this.handleChange(event,id);
      } */