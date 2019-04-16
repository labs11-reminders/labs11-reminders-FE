import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SchedMessageModal from '../Scheduler/SchedMessageModal'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Collapse

} from 'reactstrap';

// '/api/reminders/:id'

class TemplateCard extends Component {
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
    // console.log("TemplateCard this.state", this.state)
    console.log("this.props PROFILE",this.userProfile)
    return (
      <div className="template-card">
          <div className="if-undefined-make-invisible-or-hidden">
            <CardTitle>{this.props.title}</CardTitle>
            <NavLink id="createLink" onClick={this.toggle} >
              <i className="fas fa-pencil-alt" /> &nbsp; 
              <SchedMessageModal id={this.props.id} buttonLabel="Edit Group Template"/>  
            </NavLink>
            <NavLink id="createLink" onClick={()=>this.deleteReminder(this.props.id)}>
              <i className="fas fa-trash-alt" /> &nbsp;
           </NavLink>
           
            <div className="template-description">
            <CardText>{this.props.message}</CardText>
            </div>
            <CardText className="template-created">Date Created: {this.dateConverter(this.props.created_at)}</CardText>
            <CardText className="template-created">Created By: {this.props.user_id}</CardText>
     

            <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.onDelete} />{' '}
            Delete
          </Label>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.toggleSchedule} />{' '}
            Add to scheduler
          </Label>
        </FormGroup>
        </div>
      </div>
    );
  };
}

export default TemplateCard;

 {/* // TODO TEAM: Get Reminders
  getReminders = () => {
  axios.get(`${process.env.REACT_APP_BACKEND}/api/reminders`)
      .then(res => {
        //const reminders = res.data;
        //this.setState({ reminders });
        console.log(res.data);
      })
  }
   getAllGroups = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/api/groups`,
        this.state.groups,
      )
      .then(res => {
        this.setState({
          groups: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  editReminder = id => {
    console.log("editReminder ID", id)
    const editObj ={ name: this.state.reminders.name, description: this.state.reminders.description };
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
      .then(response => {
        console.log("PUT RESPONSE:", response.data)
        this.setState({ reminders: response.data})
      })
      .catch(error => console.log(error))
  }

  
  <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
              size="lg"
            >
            <ModalHeader toggle={this.toggle}>
            <h5>Edit the Template</h5>
          </ModalHeader>
          <ModalBody className="modalBody">
            <Form className="createGroup" >
              <FormGroup row>
                <Label for="templateName">Edit Title</Label>
                <Col sm={10}>
                  <Input
                    onChange={this.handleInputChange}
                    placeholder={this.props.name}
                    value={this.state.reminders.name}
                    name="name"
                    id="templateName"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="templateDescription">Edit Message</Label>
                <Col sm={10}>
                  <Input 
                    onChange={this.handleInputChange}
                    placeholder={this.props.description}
                    value={this.state.reminders.description}
                    name="description" 
                    id="templateDescription" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="templateGroup">Group</Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    placeholder="Select Group"
                    onChange={this.handleInputChange}
                    value={this.state.groups.name}
                    name="group"
                    id="templateGroup"
                  >
                    <option> --&nbsp; Select Group</option>
                    {this.state.groups.map(group => (
                      <option key={group.id}>{group.name}</option>
                    ))}{' '}
                  </Input>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.editReminder(this.props.id)} >
              Edit
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          id="alertModalWrap"
          isOpen={this.state.nestedModal}
          toggle={this.toggleNested}
        >
          <ModalBody id="alertModal">An input is Required!</ModalBody>
          <ModalFooter id="alertModalFooter">
            <Button color="danger" onClick={this.toggleNested}>
              Ok
            </Button>
          </ModalFooter>
                    </Modal>*/}
