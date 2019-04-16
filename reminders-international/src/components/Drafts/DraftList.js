import React, { Component } from 'react';
import DraftCard from './DraftCard';
import {
  Card,
  CardColumns,
  CardBody,
} from 'reactstrap';

export default class DraftList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
    };
  }

  render() {
    return (
      <div className="scheduled-list">
      Draft List
      <CardColumns className="template-list" sm="6">
       {this.props.reminders.map(reminder => { 
            if (reminder.group_id === this.props.activeGroup) {
               console.log("RENDERING DRAFT CARD ", reminder) 
            return (
              <Card>
              <CardBody key={reminder.id}>
              <DraftCard
              key={reminder.id}
              id={reminder.id}
              title={reminder.name}
              message={reminder.description}
              to={reminder.phone_send}
              date={reminder.scheduled_date}
              approved={reminder.approved}
              created_at={reminder.created_at}
              group_id={reminder.group_id}
              user_id={reminder.user_id}
              scheduled={reminder.scheduled}
              sent = {reminder.sent}
              draft = {reminder.draft}
            />
            </CardBody>
            </Card>
          )} 
      })}
        </CardColumns>
        
      </div>
    )
  }

}

