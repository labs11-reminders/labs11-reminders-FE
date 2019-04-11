import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  Form, FormGroup, Label, Input, Row, ButtonGroup } from 'reactstrap';
import SMSFormGroup from '../SMSForm/SMSFormGroup';

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
        error: false,
        groups: [],
        cSelected: []
    };

    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
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

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
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
              {/* <Label for="messageText">Write Message Here</Label>
              <Input type="textarea" name="body" id="messageText"/> */}
              <SMSFormGroup groups={this.props.groups}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Row>
            {/* <Button color="primary" onClick={this.onSubmit}>Send Group Message</Button>{' '} */}
            </Row>
            <Row>
              
            <FormGroup check inline>
            <Label for="checkboxSchedule" check> Schedule &nbsp;</Label>{' '}
              {' '}<Input type="checkbox" id="checkboxSchedule" />
              </FormGroup>
              <FormGroup check inline>
            <Label for="checkboxTemplate" check> Template &nbsp;</Label>{' '}
              <Input type="checkbox" id="checkboxTemplate" />
              </FormGroup>
              <FormGroup check inline>
            <Label for="checkboxDraft" check> Draft &nbsp;</Label>{' '}
              <Input type="checkbox" id="checkboxDraft" />
              </FormGroup>

            </Row>
            <Row>
            {/* <p>Selected: {JSON.stringify(this.state.cSelected)}</p> */}
              {/* <Button color="secondary" onClick={()=>{this.toggleTab()}>Schedule</Button> */}
              
              {/*toggle scheduled to true, and direct user to scheduled component*/}

              {/* <Button color="secondary" onClick={this.toggleTab()}>Save Template</Button> */}
              {/* <Button color="secondary" onClick={this.toggleTab()}>Save Draft</Button> */}
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MessageModal;