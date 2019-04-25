import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import SchedMessageModal from '../Scheduler/SchedMessageModal'
import {
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // NavLink,
  // Button,
  // CardTitle,
  // CardSubtitle,
  // CardText,
  // Col,
  // Form,
  FormGroup,
  Label,
  Input,
  // Row,
  // Collapse

} from 'reactstrap';
import '../Scheduler/TabMessageStyles.css';
import '../global.css';

// '/api/reminders/:id'

class TemplateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success:'',
      success_delete:'',
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
  this.toggleSchedule = this.toggleSchedule.bind(this);
  this.toggleRemove = this.toggleRemove.bind(this);
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
          this.setState({success_delete: 'Success! The message will go "poof!" as soon as you leave this tab',})
          toast.info('Successfully deleted.', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
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
          this.setState({success: 'Success!',})
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
    let month = months[parseInt(date[1]) - 1];
    let day = date[2];
    let hr = date[3];
    let min = date[4];
    return `${month} ${day}, ${yr} ${hr}:${min}`
  }
  

  toggleSchedule(event) { //connected to schedule checkbox
    console.log("Click",this.state.message.scheduled)
    const id = this.props.id
    const editObj ={scheduled: event.target.checked,};
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
      .then(response => {
        console.log("PUT RESPONSE:", response.data)
        this.setState({ message: response.data})
        this.setState({success: 'Success!',})
        this.fetchReminder(id);
        toast.info('Successfully added to scheduler.', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
      })
      .catch(err => {
        console.log(err);
    })

  }
  toggleRemove(event) {
    console.log("DELETE", !event.target.checked)
    const id = this.props.id
    const editObj ={template: !event.target.checked,};
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
      .then(response => {
        console.log("PUT RESPONSE:", response.data)
        this.setState({ message: response.data})
        this.setState({success_delete: 'Success! The message will go "poof!" as soon as you leave this tab',})
        this.fetchReminder(id);
        toast.info('Successfully removed from templates.', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
      })
      .catch(err => {
        console.log(err);
    })

  }

   
    


  

  render() {
    // console.log("TemplateCard this.state", this.state)
    console.log("this.props PROFILE",this.userProfile)
    return (
      <div className="schedule-card card bg-light mb-3">
       
          <div className="message w-65" >
          <div className = "card-header messagedetails">
          <div className = "messagetitle">{this.props.title}</div> 
          
          <SchedMessageModal id={this.props.id} buttonLabel="Edit Group Message" isOpen={this.state.message}
            toggle={this.toggle} > </SchedMessageModal> 
          
          </div>
          <div className="card-body">
          <div className = "messagebody"><strong> Message body: </strong>&nbsp;{this.props.message}</div>
          </div>
          </div> 
       
           <div className = "card messageoptions">
        
            <div className = "card-controls messagecheckboxes">
          <p>Other template options:</p>
            <FormGroup>
          <Label inline check>
            <Input type="checkbox" onClick={this.toggleSchedule} />{' '}
            Add to scheduler
          </Label>
        </FormGroup>
           <FormGroup >
          <Label inline check>
            <Input type="checkbox" onClick={this.toggleRemove} />{' '}
            Delete
          </Label>
        </FormGroup>
        <p>{this.state.success_delete}</p>
        {/* <p>{this.state.success}</p> */}

        
      </div>
     
     </div>
  
  </div>
    );
  };
};

export default TemplateCard;

