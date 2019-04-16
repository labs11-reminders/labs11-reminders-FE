import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  FormGroup, Label, Input, Row } from 'reactstrap';

import axios from 'axios';

class SchedMessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        message: {
            id: null,
            title: '', 
            to: '',
            body: '',
            approved: false, 
            date: '',
            scheduled: true,
            group_id: null, 
        },
    };

    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }

  // TOGGLE TO OPEN MODEL
    toggle() {
        this.fetchReminder(this.props.id)
        this.setState(prevState => ({
        modal: !prevState.modal,
        }));
    console.log("MODAL STATE",this.state)
    }


    // TRYING TOGGLE FOR TYPE OF BUTTON PRESSED
    toggleTab(tab){
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        })
      }
    }

    fetchReminder = id => {
        axios
          .get(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`)
          .then(response => {
            // console.log(response.data)
            this.setState(() => ({ message:{
              title: response.data.name,
              to: response.data.phone_send,
              body: response.data.description,
              approved: response.data.approved, 
              date: response.data.scheduled_date,
              scheduled: response.data.scheduled,
              group_id:response.data.group_id,
              id:response.data.id
              }}));
          }) 
          .catch(err => {
            console.log(err)
          });
      }

    createSavedReminder = () => { //connected to save button
    const { title, body, scheduled, draft, template, group_id, user_id,id } = this.state.message
    const messageObj = {
      name: title,
      description: body,
      scheduled: scheduled,
      draft: draft,
      template: template,
      group_id: group_id,
      user_id: user_id,
      }
  
  axios.put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`,  messageObj)
    .then(res => {
      console.log('PUT RESPONSE', res);
      if(res.status === 200 || res.status === 201) {
        this.setState({
          message: 'You added a Message!',
          reminders: { ...messageObj }
          });
          this.fetchReminder(id);
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
    

  render() {
    
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Message</ModalHeader>
          <ModalBody>
          <FormGroup>
              <Label for="messageText">Write Title Here</Label>
              <Input type="textfield"
              id="messageTitle"
              onChange={this.onHandleChange}
              placeholder={this.state.message.title}
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
                placeholder="some text here"
                value={this.state.message.body}
                name="body"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Row>
            <FormGroup>
              <Button color="primary" onClick = {this.createSavedReminder}>Save</Button>
              </FormGroup>
              <FormGroup>
            </FormGroup>

            </Row>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SchedMessageModal;