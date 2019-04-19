import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  FormGroup, Label, Input, Row, Col, Collapse, Card, CardBody } from 'reactstrap';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
  import DayPickerInput from 'react-day-picker/DayPickerInput';
import axios from 'axios';
import moment from "moment";

class SchedMessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success:"",
      success_delete:'',
      nestedModal: false,
      modal: false,
        message: {
            id: '',
            title: '', 
            to: '',
            body: '',
            approved: false, 
            date: '',
            scheduled: true,
            group_id: '', 
            draft: false,
            template: false,
        },
        collapseScheduler: true,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDraft = this.toggleDraft.bind(this);
    this.toggleTemplate = this.toggleTemplate.bind(this);
       }


//     collapseScheduler: false,
//   };
//   this.toggleApprove = this.toggleApprove.bind(this);
//   this.toggle = this.toggle.bind(this);
//   this.toggleScheduler = this.toggleScheduler.bind(this);
//   this.toggleNested = this.toggleNested.bind(this);
// }
// toggle() {
//   this.setState(prevState => ({
//     modal: !prevState.modal,
//   }));
// }

toggleScheduler() {
  this.setState(state => ({ collapseScheduler: !state.collapseScheduler }));
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
      
    const { title, body, scheduled, draft, date, template, group_id, user_id,id } = this.state.message
    const messageObj = {
      name: title,
      description: body,
      scheduled: scheduled,
      draft: draft,
      template: template,
      group_id: this.props.activeGroup,
      }
  
  axios.put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`,  messageObj)
    .then(res => {
      console.log('PUT RESPONSE', res);
      if(res.status === 200 || res.status === 201) {
        this.setState({
          success: 'Success!',
          reminders: { ...messageObj }
          });
        this.toggle()
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
    onDatePicker = (event) => {  
      const new_date = event
      const date_format = moment(new_date).format('YYYY-MM-DD HH:mm:ss')
      const id = this.props.id
      const editObj ={scheduled_date:date_format};
  
      axios
        .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
        .then(response => {
          console.log("PUT RESPONSE:", response.data)
          this.setState({  success: 'Success!', message: response.data})
          this.fetchReminder(id);
        })
        .catch(error => console.log(error))
      }

    onHandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      message: { ...this.state.message, [name]:value }
    });
    }

    toggleApprove(event) {
      const id = this.props.id
      const editObj ={approved:event.target.checked};
      axios
        .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
        .then(response => {
          console.log("PUT RESPONSE:", response.data)
          this.setState({success: 'Success!', message: response.data})
        })
        .catch(error => console.log(error))
        if (this.state.success){
          this.toggleSuccess()
        }
      }
  
    onTemplate= (event) => { 
    
      const id = this.props.id
      const editObj ={template:event.target.checked};
      axios
        .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
        .then(response => {
          console.log("PUT RESPONSE:", response.data)
          this.setState({success: 'Success!', message: response.data})
        })
        .catch(error => console.log(error))
        if (this.state.success){
          this.toggleSuccess()
        }
      }
      onDelete = (event) => { 
        const id = this.props.id
        console.log("ID", id)
        if (event.target.checked) {
          axios
          .delete(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`)
          .then(response => {
              console.log("DELETE RESPONSE:", response.data)
              this.setState({success_delete: 'Success! The message will go "poof!" as soon as you leave this tab',})
              
          })
          .catch(err => {
              console.log(err);
          })
        }
        }

 

  render() {
    return (

      <div>
        <Button color="link" className="editPencil" onClick={this.toggle}><i className="fas fa-pencil-alt" /></Button>
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
               <Label for="messageText">Write Message Here!!</Label>
               <Input type="textarea"
                id="messageText"
                onChange={this.onHandleChange}
                placeholder="some text here"
                value={this.state.message.body}
                name="body"
              />
            </FormGroup>
            <FormGroup>
            <Col sm={{ size: 'auto', offset: 0 }}>
            {/* <Button color="link" onClick={this.toggleScheduler} 
            className="schedulerToggle">Edit Calendar</Button> */}
            <Collapse isOpen={this.state.collapseScheduler}>
              <Card>
                <CardBody>
                <div className="schedule-functions">
            <DayPickerInput 
              className="calendar"
              onDayChange={this.onDatePicker}
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder={`${formatDate(new Date())}`}/>
            <FormGroup check inline>
              <Label>
                <Input type="checkbox" onClick={this.toggleApprove} />{' '} Approved
              </Label>  
            </FormGroup>
            <FormGroup>
              <Label check>
                <Input type="checkbox" onClick={this.onDelete} />{' '} Delete
              </Label>
            </FormGroup>
            <FormGroup>
              <Label check>
              <Input type="checkbox" onClick={this.onTemplate} />{' '}
            Template
              </Label>
            </FormGroup>
        </div>
                </CardBody>
              </Card>
            </Collapse>
          </Col>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Row>
            <FormGroup>
              <Button color="primary" onClick={this.createSavedReminder}>Save</Button>
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