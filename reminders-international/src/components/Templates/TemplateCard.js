import React, { Component } from 'react';
import EditTemplateForm from './EditTemplateForm';
import axios from 'axios';
import {
  // TabContent,
  // TabPane,
  // Nav,
  // NavItem,
  NavLink,
  // Card,
  // Button,
  CardTitle,
  CardSubtitle,
  CardText,
  // Row,
  // Col,
} from 'reactstrap';

// '/api/reminders/:id'

class TemplateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      role_id: null,
      org_id: null,
      group_id: null,
      showEditReminder: false,
      editedReminder: '',
      reminders: [],
    };
  }

  toggleForm = () => {
    this.setState({ showEditReminder: !this.state.showEditReminder})
  }

  editHandler = event => {
    this.setState({ editedReminder: event.target.value})
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
    this.editReminder();
  }

  editReminder = id => {
    console.log("TemplateCard props", this.props)
    console.log(this.state)
    const newReminder = { newReminder: this.state.editedReminder}
    console.log("newReminder & id", newReminder, id)
    axios
      .put(`http://reminders-international.herokuapp.com/api/reminders/${id}`, newReminder)
      .then(response => {
        console.log("PUT RESPONSE:", response)
        this.setState({ remindersData: response.data})
      })
      .catch(error => console.log(error))
  }

  render() {
    console.log("TemplateCard this.state", this.state)
    console.log("this.props", this.props)
    console.log("THIS.state.editedReminder", this.state.editedReminder)
    return (
      <div className="template-card">
        {this.props.template ? (
          <div className="if-undefined-make-invisible-or-hidden">
        
            <CardTitle>{this.props.name}</CardTitle>
            <NavLink id="createLink" >
              <i className="fas fa-pencil-alt" onClick={this.toggleForm}/> &nbsp; </NavLink>
              {this.state.showEditReminder ? (
          <EditTemplateForm 
            submitEdits={this.editReminder}
            reminder={this.props.reminder} 
            editHandler={this.editHandler}
          />
        ) : null}
            <NavLink id="createLink" >
              <i className="fas fa-trash-alt" /> &nbsp;
            </NavLink>
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