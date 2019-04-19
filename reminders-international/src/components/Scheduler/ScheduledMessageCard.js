import React,  { Component } from 'react';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import {Link} from 'react-router-dom';
import 'moment/locale/it';
import DayPickerInput from 'react-day-picker/DayPickerInput';
//import 'react-day-picker/lib/style.css';
import axios from 'axios';
import {
  NavLink,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  FormGroup,
  Label,
  Input,
  Row,
  Nav,
  Col,
  Collapse,
  Button,
  CardBody,

} from 'reactstrap';
import moment from "moment";
import SchedMessageModal from './SchedMessageModal'
import './TabMessageStyles.css';
import '../global.css';

// Line 2:  'MomentLocaleUtils' is defined but never used  no-unused-vars
class ScheduledMessageCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      
      message: {
        id: '',
        title: '', 
        to: '',
        body: '',
        approved: false, 
        date: '',
        scheduled: true,
        template: false,
        sent: false, 
        group_id: '',
        approved_text:'',
      },
    submitting: false,
    error: false,
    modal: true,
    collapseScheduler: false,
  };
  this.toggleApprove = this.toggleApprove.bind(this);
  this.toggle = this.toggle.bind(this);
  this.toggleCal = this.toggleCal.bind(this);
  this.toggleScheduler = this.toggleScheduler.bind(this);
  this.toggleNested = this.toggleNested.bind(this);
  this.toggleSuccess = this.toggleSuccess.bind(this);
}
toggle() {
  this.setState(prevState => ({
    modal: !prevState.modal,
  }));
}
toggleCal() {
  this.setState(state => ({ collapse: !state.collapse }));
}
toggleSuccess() {
  this.setState(state => ({
    success: '',
  }));
  }

toggleScheduler() {
  this.setState(state => ({ collapseScheduler: !state.collapseScheduler }));
 
}

toggleNested() {
  this.setState({
    nestedModal: !this.state.nestedModal,
  });
}
fetchReminder = id => {
  axios
    .get(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`)
    .then(response => {
      let approved_text;
      if (response.data.approved == true) {
        approved_text = "Scheduled to be sent " 
      } else if (this.state.message.approved == false) {
        approved_text = "Needs approval to be sent " 
      }
        this.setState(() => ({ message:{
        title: response.data.name,
        to: response.data.phone_send,
        body: response.data.description,
        approved: response.data.approved, 
        date: response.data.scheduled_date,
        scheduled: response.data.scheduled,
        template: response.data.template,
        sent: response.data.sent,
        id:response.data.id,
        approved_text: approved_text,
        }}));
  
    }) 
    .catch(err => {
      console.log(err)
    });
}

  componentDidMount() {
    console.log(this)
    const id = this.props.id
    this.fetchReminder(id);
  
  }

  dateConverter = date => {
    if (!date) {return `TBD`}
    date = date.split(/\W+/);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let yr = date[0];
    let month = months[date[1]/1 - 1];
    let day = date[2];
    let hr = date[3];
    let min = date[4];
    return `${month} ${day}, ${yr} `
  }

  getProfile = (cb) => {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        this.userProfile.user_id = 1;
      }
      cb(err, profile);
    });
  }

  handleChange = () => { 
    const id = this.props.id
    const editObj ={approved:this.state.message.approved, scheduled_date: this.state.message.date};
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
      .then(response => {
        console.log("PUT RESPONSE:", response.data)
        this.setState({ message: response.data})
      })
      .catch(error => console.log(error))
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

  onDatePicker = (event) => {  
    const new_date = event
    const date_format = moment(new_date).format('YYYY-MM-DD HH:mm:ss')
    const id = this.props.id
    const editObj ={scheduled_date:date_format};

    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
      .then(response => {
        console.log("PUT RESPONSE:", response.data)
        this.setState({success: 'Success!', message: response.data})
        this.fetchReminder(id);
      })
      .catch(error => console.log(error))
    }
  
  editReminder = id => {
    console.log("editReminder ID", id)
    const editObj ={name: this.state.message.title, description: this.state.message.body};
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
      .then(response => {
        console.log("PUT RESPONSE:", response.data)
        this.setState({ success: 'Success!', message: response.data})
        this.fetchReminder(id);
      })
      .catch(error => console.log(error))
  }

  deleteReminder = id => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`)
      .then(response => {
          console.log("DELETE RESPONSE:", response.data)
          this.setState({ reminders: response.data, reminder: "" })
      })
      .catch(err => {
          console.log(err);
      })
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
      

  render(){
    
    
  return (
          <div className="card">
       
          <section className="message" >
          <div className = "messagedetails">
          <div className = "messagetitle">{this.props.title}</div> 
          <div>

            {/* I commented this out and then below removed the onClosed --which stopped the loop since the modal
            will usually be closed I think this is what was triggering the loop. I removed it on drafts and templates too. */}
          {/* <SchedMessageModal id={this.props.id} buttonLabel="Edit Group Message" isOpen={this.state.message}
            toggle={this.toggle} onClosed={this.fetchReminder(this.props.id)}> </SchedMessageModal> */}

          <SchedMessageModal id={this.props.id} buttonLabel="Edit Group Message" isOpen={this.state.message}
            toggle={this.toggle}> </SchedMessageModal> 
          </div>
          </div>

          <div className = "messagebody"><strong> Message to be sent: </strong>&nbsp;{this.props.message}</div>
          <div className = "messagebody">  <strong> {this.state.message.approved_text} on:</strong>  &nbsp;{this.dateConverter(this.props.date)}</div>
          </section>
          
          <section className = "messageoptions">
          
       
  <Button color="link" onClick={this.toggleCal} > <strong>Click here </strong> to update schedule </Button>  
            <Collapse isOpen={this.state.collapse}>
            <DayPickerInput classNameName="calendar"
              onDayChange={this.onDatePicker}
              onDayMouseEnter={this.onDatePicker}
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder={`${formatDate(new Date())}`}/>
          </Collapse>
          <div>
            <div className = "messagecheckboxes">
              <FormGroup>
              <Label inline check>
                <Input type="checkbox" onClick={this.toggleApprove} />{' '} 
                Approve
              </Label>  
            </FormGroup>
            <FormGroup>
              <Label inline check>
              <Input type="checkbox" onClick={this.onTemplate} />{' '}
            Add to templates
          </Label>
        </FormGroup>
            <FormGroup>
              <Label inline check>
                <Input type="checkbox" onClick={this.onDelete} />{' '}
                 Delete
              </Label>
            </FormGroup>
            <p>{this.state.success_delete}</p>
            <p>{this.state.success}</p>

          
        </div>
        </div>
    </section>
  
    </div>
  );
};
};

export default ScheduledMessageCard;
