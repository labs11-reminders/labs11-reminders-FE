import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import SMSForm from '../SMSForm/SMSForm';

class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      message: {
        to: '',
        body: ''
      },
      submitting: false,
      error: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
            {/* <Button color="secondary" onClick={this.onSubmit}>Send</Button> */}
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