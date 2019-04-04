import React,  { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';

class ScheduledMessageCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      message: {
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
  //this.toggleApprove = this.toggleApprove.bind(this);
}
  render(){
  return (
    <div className="scheduled-card">

      <CardTitle>{this.props.name}</CardTitle>

      <div className="scheduled-description">
        <CardSubtitle>Message</CardSubtitle>
        <CardText>{this.props.description}</CardText>
      </div>
      

    </div>
  );
};
}
export default ScheduledMessageCard;


/*
class ScheduledMessageCard extends Component{
    constructor(props) {
      super(props);
      this.state = {
        message: [
          title: '', 
          to: '',// TODO: props from user group list 
          body: '',
          approved: false, // TODO: create approved column for backend - change worker.py to reflect change
          date: '',//TODO: set from react datetime selector 
          scheduled: true //NOTE: scheduled is toggled to true in 'MessageModal'
        ],
      submitting: false,
      error: false
    };
    this.toggleApprove = this.toggleApprove.bind(this);
  }

fetchReminder = id => {
  axios
    .get(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`)
    .then(response => {
      this.setState(() => ({ message:response.data}));
    })
    .catch(err => {
      console.log(err)
    });
}

componentDidMount() {
  console.log("mounted")
  const id = this.props.scheduled_reminder_id;
  this.fetchReminder(id);
}
/*
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