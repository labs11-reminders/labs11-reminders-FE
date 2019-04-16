import React, { Component } from 'react';
import axios from 'axios';
import {
  NavLink,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,

} from 'reactstrap';

class DraftCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      user_id: null,
      role_id: null,
      org_id: null,
      group_id: null,
      reminders: [],
      orgs: [],
      groups: [],
      users: [],
      message: '',
      reminder: '',
      deleteVisible: false,
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

  onDismiss = () => {
    this.setState({ 
      deleteVisible: !this.state.deleteVisible, 
    })
  }

  // TODO TEAM: Get reminders
  getReminders = () => {
  axios.get(`${process.env.REACT_APP_BACKEND}/api/reminders`)
      .then(res => {
        //const reminders = res.data;
        //this.setState({ reminders });
        console.log(res.data);
      })
  }

  editReminder = id => {
    console.log("editReminder ID", id)
    const editObj ={ name: this.state.reminders.name, description: this.state.reminders.description };
    axios
      .put(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, editObj)
      .then(response => {
        console.log("PUT RESPONSE:", response.data)
        this.setState({ ...{reminders: response.data}})
      })
      .catch(error => console.log(error))
  }

  deleteReminder = id => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`)
      .then(response => {
          console.log("DELETE RESPONSE:", response.data)
          this.setState({ ...{reminders: response.data}, reminder: "" })
      })
      .catch(err => {
          console.log(err);
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ reminders: { ...this.state.reminders, [name]: value } });
  };

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

  componentDidMount(){
    this.getReminders();
    this.getAllGroups();
  }

  render() {
    // console.log("DraftCard this.state", this.state)
    return (
      <div className="template-card">
        {this.props.draft ? (
          <div className="if-undefined-make-invisible-or-hidden">
        
            <CardTitle>{this.props.name}</CardTitle>
            <NavLink id="createLink" onClick={this.toggle} >
              <i className="fas fa-pencil-alt" /> &nbsp; 
            </NavLink>
            <NavLink id="createLink" onClick={()=>this.deleteReminder(this.props.id)}>
              <i className="fas fa-trash-alt" /> &nbsp;
            </NavLink>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
              size="lg"
            >
            <ModalHeader toggle={this.toggle}>
            <h5>Edit the Draft</h5>
          </ModalHeader>
          <ModalBody className="modalBody">
            <Form className="createGroup" >
              <FormGroup row>
                <Label for="draftName">Edit Title</Label>
                  <Col sm={10}>
                    <Input
                      onChange={this.handleInputChange}
                      placeholder={this.props.name}
                      value={this.state.reminders.name}
                      name="name"
                      id="draftName"
                    />
                  </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="draftDescription">Edit Message</Label>
                <Col sm={10}>
                  <Input 
                    onChange={this.handleInputChange}
                    placeholder={this.props.description}
                    value={this.state.reminders.description}
                    name="description" 
                    id="draftDescription" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="draftGroup">Group</Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    placeholder="Select Group"
                    onChange={this.handleInputChange}
                    value={this.state.groups.name}
                    name="group"
                    id="draftGroup"
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
        </Modal>
            <div className="template-description">
              <CardSubtitle>Message</CardSubtitle>
              <CardText>{this.props.description}</CardText>
            </div>

            <CardText className="draft-created">Date Created: {this.dateConverter(this.props.created_at)}</CardText>
            <CardText className="draft-created">Created By: {this.props.user_id}</CardText>
            <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.toggleSchedule} />{' '}
            Add to scheduler
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.toggleSchedule} />{' '}
            Add to Templates
          </Label>
        </FormGroup>
        
        </div>): undefined}
      </div>
    )
  };
};

export default DraftCard;