import React,  { Component } from 'react';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import {
  // TabContent,
  // TabPane,
  // Nav,
  // NavItem,
  // NavLink,
  Card,
  // Button,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  InputGroup, 
  InputGroupAddon, 
  InputGroupText, 
  Input, 
  FormGroup,
  Label,


} from 'reactstrap';


class ScheduledMessageCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      message: {
        id:'',
        title: '', 
        to: '',// TODO: props from user group list 
        body: '',
        approved: false, // TODO: create approved column for backend - change worker.py to reflect change
        date: '',//TODO: set from react datetime selector 
        scheduled: true //NOTE: scheduled is toggled to true in 'MessageModal'
      },
    submitting: false,
    error: false
  };
  this.toggleApprove = this.toggleApprove.bind(this);
}

fetchReminder = id => {
  axios
    .get(`${process.env.REACT_APP_BACKEND}api/reminders/${id}`)
    .then(response => {
      console.log(response.data)
      this.setState(() => ({ message:{
        title: response.data.name,
        to: '',
        body: response.data.description,
        approved: false, 
        date: '',
        scheduled: true,
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

  handleChange = () => {
    //event.preventDefault();
    const id = this.props.id
    this.setState({ submitting: true });
    fetch(`${process.env.REACT_APP_BACKEND}api/reminders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      to: this.state.to,
      body: JSON.stringify(this.state.message),
      approved: this.state.approved, 
      date: this.state.date,
      scheduled: this.state.scheduled
    })
      .then(res => {
        if (res.status === 200) {
          console.log('scheduling message');
          this.setState({
            error: false,
            submitting: true,
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
       // res.json()
      })
      .catch(err => {
        console.log(err)
      })
  }

  toggleApprove() {
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
    console.log(this.state)
    //this.handleChange(); --- NEED BACKEND UPDATES
  }

  onDatePicker = (event) => {  
    const date = event
    this.setState({
      message: { ...this.state.message, date:date}
    });
   
    console.log(this.state.message.date)
    
    //this.handleChange(event,id);
    }
    
    

  render(){
    

  return (
    <div className="scheduled-card">
           
      {this.props.scheduled ? (
        <div>
          <Card>
          <CardTitle>{this.props.title}</CardTitle>

      <div className="scheduled-description">
        <CardSubtitle>Message</CardSubtitle>
        <CardText>{this.props.message}</CardText>
        <div className="schedule-functions">
        <DayPickerInput onDayChange={this.onDatePicker}
        dayPickerProps={{
        month: new Date(),
        showWeekNumbers: true,
        todayButton: 'Today',
        }}
    />
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.toggleApprove} />{' '}
            Approved
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


/*
this.setState({message:{
      id:this.state.id,
      title: this.state.title, 
      to: this.state.to,
      body: this.state.body,
      approved: this.state.approved, 
      date: event,
      scheduled: true }});
handleChange = (event,id) => {
  event.preventDefault();
  this.setState({ submitting: true });
  fetch(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    to: this.state.to,
    body: JSON.stringify(this.state.message),
    approved: this.state.approved, 
    date: this.state.date,
    scheduled: this.state.scheduled
  })
    .then(res => {
      if (res.status === 200) {
        console.log('scheduling message');
        this.setState({
          error: false,
          submitting: true,
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
}*/

/*

//------ Date handlers triggered in ScheduledMessageCard --------
onDatePicker = (event,id) => {  
  //NEEDS TO BE EDITED 
  //this.handleChange(event,id);
}

toggleApprove(event,id) {
  this.setState(prevState => ({
    approved: !prevState
  }));
  //this.handleChange(event,id);

}



render() {
  return (

    <div className="scheduled-message-card">
      <div className="scheduled-message-title">
      <h2>{this.state.title}</h2>
       <Button className="edit_button">
          <MessageModal buttonLabel="edit title" id = {this.props.scheduled_reminders_id}/>  
        </Button>
      </div>

      <div className="scheduled-message-description">
        <h3>Message</h3>
        <p>{this.state.message}</p>
      </div>

      {/* TODO - Finish Calendar - <div className="w-25 py-5 my-5 mx-auto">
        <DatePicker label="Birthday" value="2000-08-15" />
  </div>

      <div className='check_box'>
      <FormGroup onClick={this.toggleApprove()} id = {this.props.scheduled_reminders_id}> 
          <Label for="checkbox_approve">approved</Label>
          <Input type="checkbox" approved="approved" id="checkbox_approve"/> 
        </FormGroup>
      </div>
    </div>
  );
};
}
export default ScheduledMessageCard;
*/