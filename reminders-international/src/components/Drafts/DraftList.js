import React, { Component } from 'react';
// import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';
import DraftCard from './DraftCard';
import {
  // TabContent,
  // TabPane,
  // Nav,
  // NavItem,
  // NavLink,
  Card,
  // CardDeck,
  CardColumns,
  CardBody,
  // Button,
  // CardTitle,
  // CardText,
} from 'reactstrap';

export default class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: []
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



  componentDidMount () {
    this.getAllReminders();
  }


  render() {
    return (
      <div className="template-list">
      <CardColumns sm="6">
          {this.state.reminders.map(reminder => {
            return (
              <Card>
                <CardBody>
              <DraftCard 
                id={reminder.id}
                key={reminder.id}
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
            )
          })}
        </CardColumns>
      </div>
    )
  }

}
