import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

class MessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create a Message</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="messageText">Write Message Here</Label>
              <Input type="textarea" name="text" id="messageText" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Save Draft</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Schedule</Button>
            <Button color="secondary" onClick={this.toggle}>Send</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MessageModal;