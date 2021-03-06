import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

import axios from 'axios';

class MessageModalGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      modal: false,
      message: {
        users: [],
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
      groups:this.props.groups,
     
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
  
    }
    toggleDraft(event) { //connected to draft checkbox
      this.setState({
        message: { ...this.state.message, draft: event.target.checked }
    });

    }
    toggleTemplate(event) { //connected to template checkbox
      this.setState({
      message: { ...this.state.message, template: event.target.checked }
     });
 
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


    onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
    }
    
    getUserInfo = () => {
      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if (profile) {
          axios.post(`${process.env.REACT_APP_BACKEND}/api/users/auth`, {auth0_sub: profile.sub})
            .then(res => {
              return axios.get(`${process.env.REACT_APP_BACKEND}/api/users/data/${this.user.id}`, this.user.auth0_sub)
            })
            .then(res => {
              this.setState({
                user: res.data
              });
            })
            .catch(err => {
              console.log(err);
            })     
        }
      });   
    }
    
    onGroupToggle() { //select group button
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
        }));
    }

    fetchGroupUsers = id => {
      console.log("FETCHING USERS")
      axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/${id}/users`, this.state.toggleDraft)
        .then(res => { 
          console.log(res, res.data) 
          this.setState({
            message: { ...this.state.message, users:res.data, }
          });
      })
      .catch(err => {
          console.log(err);
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
          <ModalHeader toggle={this.toggle}>Create Message</ModalHeader>
          <ModalBody>
          <FormGroup>
              <Label for="messageText">Write Title Here</Label>
              <Input type="textfield"
              id="messageTitle"
              onChange={this.onHandleChange}
              placeholder="Example: No class for the holiday"
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
                placeholder="Example: We won't be having class for the holidays. Study notes from this week"
                value={this.state.message.body}
                name="body"
              />
           </FormGroup>
          </ModalBody>
          <ModalFooter>
              <FormGroup>
              <Label> Schedule &nbsp;{' '}
                <Input type="checkbox"  onClick={this.toggleSchedule} />{' '}
              </Label>
              </FormGroup>
            <FormGroup>
            <Label> Template &nbsp;{' '}
              <Input type="checkbox"  onClick={this.toggleTemplate} />{' '}
              </Label>
              </FormGroup>
              <FormGroup>
            <Label> Draft   &nbsp;{' '}
              <Input type="checkbox" onClick={this.toggleDraft}  />{' '}
              </Label>
              </FormGroup>
              <FormGroup>
              <Button color="primary" onClick = {this.createSavedReminder}>Save</Button>
              </FormGroup>
              <FormGroup>
              <Button  onClick = {this.onSubmit} >Send Now
              </Button>
              </FormGroup>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MessageModalGroup;