import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import AddContactSearchBar from './AddContactsSearchBar.js';
import AddContactSearchTable from './AddContactsSearchTable.js';
import axios from 'axios';

class AddContactModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    return (
      <div>
        <span onClick={this.toggle}>{this.props.buttonLabel}</span>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Contact</ModalHeader>
          <ModalBody>
            <AddContactSearchBar activeGroup={this.props.activeGroup}/>
           
          </ModalBody>
          <ModalFooter>
            
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddContactModal;
