import React, { Component } from 'react';
import axios from 'axios';
import SchedMessageModal from '../Scheduler/SchedMessageModal'
import {
  NavLink,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  FormGroup,
  Label,
  Input,

} from 'reactstrap';
import '../Scheduler/TabMessageStyles.css';
import '../global.css';

class DraftCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        id: '',
        title: '', 
        to: '',
        body: '',
        approved: false, 
        date: '',
        scheduled: true,
        template: true,
        draft:false,
        sent: false, 
        group_id: ''
      },
    submitting: false,
    error: false
  };
  
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
        this.setState(() => ({ message:{
        title: response.data.name,
        to: response.data.phone_send,
        body: response.data.description,
        approved: response.data.approved, 
        date: response.data.scheduled_date,
        scheduled: response.data.scheduled,
        template: response.data.template,
        draft: response.data.draft,
        sent: response.data.sent,
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

  
  onDelete = (event) => { 
    const id = this.props.id
    console.log("ID", id)
    if (event.target.checked) {
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

  dateConverter = date => {
    if (!date) {return `TBD`}
    date = date.split(/\W+/);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let yr = date[0];
    let month = months[date[1]/1 - 1];
    let day = date[2];
    let hr = date[3];
    let min = date[4];
    return `${month} ${day}, ${yr} ${hr}:${min}`
  }

  render() {
    // console.log("DraftCard this.state", this.state)
    return (
      <div className="card">
      <section className="message" >
      <div className = "messagedetails">
      <div className = "messagetitle">{this.props.title}</div> 
      <div>
      <SchedMessageModal id={this.props.id} buttonLabel="Edit Group Message" isOpen={this.state.message}
        toggle={this.toggle} onClosed={this.fetchReminder(this.props.id)}> </SchedMessageModal> 
      </div>
      </div>
       
      <div className = "messagebody"><strong> Message body: </strong>&nbsp;{this.props.message}</div>
      </section> 
      <section className = "messageoptions">
           <div>
            <div className = "messagecheckboxes">
          <p>Other draft options:</p>
          <FormGroup>
            <Label  inline check>
              <Input type="checkbox" onClick={this.toggleSchedule} />{' '}
              Add to scheduler
            </Label>
          </FormGroup>
            <FormGroup>
            <Label inline check>
              <Input type="checkbox" onClick={this.onDelete} />{' '}
              Delete
            </Label>
          </FormGroup>
  
        
          </div>
      </div>
      </section>
  
  </div>
    )
  };
};

export default DraftCard;