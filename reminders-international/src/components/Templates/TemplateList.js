import React, { Component } from 'react';
// import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';
import TemplateCard from './TemplateCard';
import {
  // TabContent,
  // TabPane,
  // Nav,
  // NavItem,
  // NavLink,
  Card,
  // CardDeck,bo
  CardColumns,
  CardBody,
  // Button,
  // CardTitle,
  // CardText,
} from 'reactstrap';

export default class TemplateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      // editedReminder: '',
    };
  }

  getAllReminders = () => {
    axios.get("https://reminders-international.herokuapp.com/api/reminders", this.state.reminders)
      .then(res => {
        this.setState({
          reminders: res.data
        });
    })
    .catch(err => {
        console.log(err);
    });
  }

  // editReminder = props => {
  //   console.log(props)
  //   const newReminder = { newReminder: this.state.editedReminder}
  //   axios
  //     .put(`http://reminders-international.herokuapp.com/api/reminders${this.props.reminder.id}`, newReminder)
  //     .then(response => {
  //       console.log("PUT RESPONSE:", response)
  //       this.setState({ remindersData: response.data})
  //     })
  //     .catch(error => console.log(error))
  // }



  componentDidMount () {
    this.getAllReminders();
  }


  render() {
    console.log("Template list this.state", this.state)
    return (
      <CardColumns className="template-list" sm="6">
        {this.state.reminders.map((reminder, index) => 
          <Card>
            <CardBody key={reminder.id}> 
              <TemplateCard 
                name={reminder.name}
                description={reminder.description}
                created_at={reminder.created_at}
                group_id={reminder.group_id}
                user_id={reminder.user_id}
                scheduled={reminder.scheduled}
                draft={reminder.draft}
                template={reminder.template}
              />
            </CardBody>
          </Card>
        )}
      </CardColumns>
    )
  }

}

