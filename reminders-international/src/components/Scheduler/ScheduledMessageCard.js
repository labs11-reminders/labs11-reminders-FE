import React,  { Component } from 'react';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import 'moment/locale/it';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
//import requiresAuth from '../../Auth0/Auth/requiresAuth.js'
import {
  NavLink,
  Card,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  // Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,

} from 'reactstrap';
import moment from "moment";
import SchedMessageModal from './SchedMessageModal'


class ScheduledMessageCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      message: {
        id:'',
        title: '', 
        to: '',
        body: '',
        approved: false, 
        date: '',
        scheduled: true,
        group_id:'' 
      },
    submitting: false,
    error: false
  };
  this.toggleApprove = this.toggleApprove.bind(this);
  this.toggle = this.toggle.bind(this);
  this.toggleNested = this.toggleNested.bind(this);
}
toggle() {
  this.setState(prevState => ({
    modal: !prevState.modal,
  }));
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
      // console.log(response.data)
      this.setState(() => ({ message:{
        title: response.data.name,
        to: response.data.phone_send,
        body: response.data.description,
        approved: response.data.approved, 
        date: response.data.scheduled_date,
        scheduled: response.data.scheduled,

        id:response.data.id
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
  getProfile = (cb) => {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        // TODO Remove once the user table is linked to Auth0
        this.userProfile.user_id = 1;
      }
      cb(err, profile);
    });
  }

  handleChange = () => { // BLOCKER - Called in onDatePicker() and toggleApproved()
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
        this.setState({ message: response.data})
      })
      .catch(error => console.log(error))
    }

  onDatePicker = (event) => {  //need to have card state re-render properly 
    
    const new_date = event
    const date_format = moment(new_date).format('YYYY-MM-DD HH:mm:ss')
    const id = this.props.id
    const editObj ={scheduled_date:date_format};

    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
      .then(response => {
        console.log("PUT RESPONSE:", response.data)
        this.setState({ message: response.data})
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
        this.setState({ message: response.data})
        this.fetchReminder(id);
      })
      .catch(error => console.log(error))
  }

  onDelete = (event) => {  //need to work on card rendering 
    const id = this.props.id
    console.log("ID", id)
    if (event.target.checked == true) {
      axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`)
      .then(response => {
          console.log("DELETE RESPONSE:", response.data)
          
      })
      .catch(err => {
          console.log(err);
      })
    }
    }
      

  render(){
    
  return (
    <div className="scheduled-card">
           
     {this.props.scheduled ? ( //conditional rendering based on if scheduled is true or false*/}
        <div>
          <Card>
          <CardTitle>{this.props.title}</CardTitle>

      <div className="scheduled-description">
        <CardSubtitle>Message</CardSubtitle>
        <CardText>{this.props.message}</CardText>
        <NavLink id="createLink" onClick={this.toggle} >
              <i className="fas fa-pencil-alt" /> &nbsp; 
        </NavLink>
        <SchedMessageModal id={this.props.id} buttonLabel="Edit Group Message"/>  
    
        <div className="schedule-functions">
        <CardText>Currently scheduled for {this.props.date}</CardText>
        <DayPickerInput
        onDayChange={this.onDatePicker}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder={`${formatDate(new Date())}`}
    />
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.toggleApprove} />{' '}
            Approved
          </Label>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.onDelete} />{' '}
            Delete
          </Label>
        </FormGroup>
        </div>
          </div>

          </Card>
        </div>
      ): undefined }

    </div>
  );
};
}
export default ScheduledMessageCard;


