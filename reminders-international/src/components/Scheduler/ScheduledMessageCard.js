import React,  { Component } from 'react';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'
import 'moment/locale/it';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import {
   Card,
   CardTitle,
  CardSubtitle,
  CardText,
  Input, 
  FormGroup,
  Label,


} from 'reactstrap';
import moment from "moment";


class ScheduledMessageCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      message: {
        id:'',
        title: '', 
        to: '',// TODO: props from user group list 
        body: '',
        approved: false, // TODO: Change worker.py to reflect change
        date: '',//TODO: set from react datetime selector 
        scheduled: true 
      },
    submitting: false,
    error: false
  };
  this.toggleApprove = this.toggleApprove.bind(this);
}

fetchReminder = id => {
  axios
    .get(`https://reminders-international.herokuapp.com/api/reminders/${id}`)
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
  handleChange = () => { // BLOCKER - Called in onDatePicker() and toggleApproved()
    const id = this.state.message.id
    //const date = moment.utc(this.state.message.date)
    axios
    .put(`https://reminders-international.herokuapp.com/api/reminders/${id}`,  
    {   message:{
        id:this.state.id,
        title: this.state.title, 
        to: this.state.to,
        body: this.state.body,
        approved: true, 
        date: this.state.date,
        scheduled: true
    }
    }).then(res => {
        window.location.reload();
    }).catch(err => {
        console.log(err);
    })}
 
  toggleApprove() {
  //console.log(this.state.message)
    if (this.state.message.approved == false) {
      this.setState({message:{
        id:this.state.id,
        title: this.state.title, 
        to: this.state.to,
        body: this.state.body,
        approved: true, 
        date: this.state.date,
        scheduled: true }});
    } else if (this.state.message.approved == true) {
      this.setState({message:{
        id:this.state.id,
        title: this.state.title, 
        to: this.state.to,
        body: this.state.body,
        approved: false, 
        date: this.state.date, 
        scheduled: true }});
    } 
    console.log(this.state.message.approved)
    this.handleChange(); 
    //const id = this.props.id
    //this.fetchReminder(id)
  }

  onDatePicker = (event) => {  //need to have state re-render properly 
    //console.log(this.state.message.date)
    const date = event
    this.setState({
      message: { ...this.state.message, date:date}
    });
    //console.log(this.state.message.date)
    this.handleChange();
    }

  onDelete = () => {  //BLOCKER - call not working 
    const id = this.props.id
      axios.delete(`https://reminders-international.herokuapp.com/api/reminders/${id}`, {message: this.state.message})
      .then(res => {
          window.location.reload();
      })
      .catch(err => {
          console.log(err);
        })
    }
     
      

  render(){
    
  return (
    <div className="scheduled-card">
           
      {this.props.scheduled ? ( //conditional rendering based on if scheduled is true or false
        <div>
          <Card>
          <CardTitle>{this.props.title}</CardTitle>

      <div className="scheduled-description">
        <CardSubtitle>Message</CardSubtitle>
        <CardText>{this.props.message}</CardText>
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


