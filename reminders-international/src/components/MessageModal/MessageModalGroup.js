import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  Form, FormGroup, Label, Input, Row, ButtonGroup, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
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
        title:'',
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
        cSelected: [],
        dropdownOpen:false 
    };

    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    this.toggleSchedule = this.toggleSchedule.bind(this);
    this.toggleDraft = this.toggleDraft.bind(this);
    this.toggleTemplate = this.toggleTemplate.bind(this);
    this.onGroupToggle = this.onGroupToggle.bind(this);
  }

  // TOGGLE TO OPEN MODEL
    toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      groups: this.props.state.groups
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

    toggleSchedule(event) { //connected to schedule checkbox
      this.setState({
        message: { ...this.state.message, scheduled: event.target.checked }
      });
     console.log(this)
    }
    toggleDraft(event) { //connected to draft checkbox
      this.setState({
        message: { ...this.state.message, draft: event.target.checked }
    });
    console.log(this)
    }
    toggleTemplate(event) { //connected to template checkbox
      this.setState({
      message: { ...this.state.message, template: event.target.checked }
     });
      console.log(this)
    }

    createSavedReminder = () => { //connected to save button
    const { title, body, scheduled, draft, template, group_id, user_id } = this.state.message
    const messageObj = {
      name: title,
      description: body,
      scheduled: scheduled,
      draft: draft,
      template: template,
      group_id: group_id,
      user_id: user_id,
      }
  
  axios.post(`${process.env.REACT_APP_BACKEND}/api/reminders`,  messageObj)
    .then(res => {
      console.log('POST RESPONSE', res);
      if(res.status === 200 || res.status === 201) {
        this.setState({
          message: 'You added a Message!',
          reminders: { ...messageObj }
          });
      }
    })
  .catch(err => {
      console.log(err);
      this.setState({
        message: 'You failed to add a group.',
        reminder: { ...messageObj }
        });
  });
    }

    onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      message: { ...this.state.message, [name]:value }
    });
    }

  //toggleDraft(event, id) {
   // this.setState(prevState => ({
    //  draft: !prevState
   // }));
   // this.handleChange(event,id);
  //}

    onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
    }
    

    onGroupToggle() { //select group button
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
        }));
    }


    onGroupSelect = (event) => { //when group is selected from drop down group id is assigned
      this.setState({
        message: { ...this.state.message, group_id: event.target.id }
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
              <Label for="messageText">Write Title Here</Label>
              <Input type="textfield"
              id="messageTitle"
              onChange={this.onHandleChange}
              placeholder="example: No class for the holiday"
              value={this.state.message.title}
              name="title"
              />
              {/*<SMSFormGroup groups={this.props.groups}/>*/}
            </FormGroup>
            <FormGroup>
               <Label for="messageText">Write Message Here</Label>
               <Input type="textarea"
                id="messageText"
                onChange={this.onHandleChange}
                placeholder="example: We won't be having class for the holidays. Study notes from this week"
                value={this.state.message.body}
                name="body"
              />
              {/*<SMSFormGroup groups={this.props.groups}/>*/}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Row>
            {/* <Button color="primary" onClick={this.onSubmit}>Save Group Message</Button>{' '} */}
            </Row>
            <Row>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.onGroupToggle}>
        <DropdownToggle caret>
          Select Group
        </DropdownToggle>
        <DropdownMenu>
          {this.state.groups.map(group => { 
          return ( <DropdownItem id = {group.id} onClick = {this.onGroupSelect}>{group.name}</DropdownItem>)})}
        </DropdownMenu>
      </Dropdown>
            <FormGroup check inline>
              <Label for="checkboxSchedule" check> Schedule &nbsp;{' '}
                <Input type="checkbox" id="checkboxSchedule" onClick={this.toggleSchedule} />{' '}
              </Label>
              </FormGroup>
            <FormGroup check inline>
            <Label for="checkboxTemplate" check> Template &nbsp;{' '}
              <Input type="checkbox" id="checkboxTemplate" onClick={this.toggleTemplate} />{' '}
              </Label>
              </FormGroup>
              <FormGroup check inline>
            <Label for="checkboxDraft" check> Draft   &nbsp;{' '}
              <Input type="checkbox" id="checkboxDraft"onClick={this.toggleDraft}  />{' '}
              </Label>
              </FormGroup>
              <FormGroup>
              <Button color="primary" onClick = {this.createSavedReminder}>Save</Button>
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