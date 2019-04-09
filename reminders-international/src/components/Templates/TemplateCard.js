import React, { Component } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // TabContent,
  // TabPane,
  // Nav,
  // NavItem,
  NavLink,
  // Card,
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

} from 'reactstrap';

// '/api/reminders/:id'

class TemplateCard extends Component {
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

  getReminders = () => {
  axios.get('http://reminders-international.herokuapp.com/api/reminders')
      .then(res => {
        //const reminders = res.data;
        //this.setState({ reminders });
        console.log(res.data);
      })
  }

  componentDidMount(){
    this.getReminders();
    this.getAllGroups();
    // this.editReminder();
  }

  editReminder = (edits, id) => {
    axios
      .put(`http://reminders-international.herokuapp.com/api/reminders/${id}`, edits)
      .then(response => {
        console.log("PUT RESPONSE:", response)
        this.setState({ remindersData: response.data})
      })
      .catch(error => console.log(error))
  }

  getAllGroups = () => {
    axios
      .get(
        'https://reminders-international.herokuapp.com/api/groups',
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

  render() {
    console.log("TemplateCard this.state", this.state)
    console.log("this.props", this.props)
    return (
      <div className="template-card">
        {this.props.template ? (
          <div className="if-undefined-make-invisible-or-hidden">
        
            <CardTitle>{this.props.name}</CardTitle>
            <NavLink id="createLink" onClick={this.toggle} >
              <i className="fas fa-pencil-alt" /> &nbsp; </NavLink>
            <NavLink id="createLink" >
              <i className="fas fa-trash-alt" /> &nbsp;
            </NavLink>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="groupModal"
              size="lg"
            >
            <ModalHeader toggle={this.toggle}>
            <h5>Edit the Template</h5>
          </ModalHeader>
          <ModalBody className="modalBody">
            <Form className="createGroup" onSubmit={this.editReminder}>
              <FormGroup row>
                <Label for="name">Edit Title</Label>
                <Col sm={10}>
                  <Input
                    onChange={this.handleInputChange}
                    placeholder={this.props.name}
                    value={this.state.reminders.name}
                    name="name"
                    id="name"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="code">Edit Message</Label>
                <Col sm={10}>
                  <Input 
                    onChange={this.handleInputChange}
                    placeholder={this.props.description}
                    value={this.state.reminders.description}
                    name="description" 
                    id="description" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="group">Group</Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    placeholder="Select Group"
                    onChange={this.handleInputChange}
                    value={this.state.groups.name}
                    name="group"
                    id="group"
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
            <Button color="primary" onClick={this.editReminder}>
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

            <CardText className="template-created">Date Created: {this.props.created_at}</CardText>
            <CardText className="template-created">Created By: {this.props.user_id}</CardText>
        
        </div>): undefined}
      </div>
    )
  };
};

export default TemplateCard;