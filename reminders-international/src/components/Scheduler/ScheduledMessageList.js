import React, { Component } from 'react';
import ScheduledMessageCard from './ScheduledMessageCard';
//import { Link } from 'react-router-dom';
import {
  Card,
  CardColumns,
  CardBody,
} from 'reactstrap';

export default class ScheduledMessageList extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    return(
    <div className="scheduled-list">
    ScheduledMessageList
    <CardColumns sm="6">
        {this.props.group_reminders.map(group_reminder => { //change to scheduled reminders when whe have them 
          return (
              <Card>
              <CardBody key={group_reminder.id}>
              <ScheduledMessageCard //ADD approved and date
              key={group_reminder.id}
              id={group_reminder.id}
              title={group_reminder.name}
              message={group_reminder.description}
              to={group_reminder.phone_send}
              date={group_reminder.scheduled_date}
              approved={group_reminder.approved}
              created_at={group_reminder.created_at}
              group_id={group_reminder.group_id}
              user_id={group_reminder.user_id}
              scheduled={group_reminder.scheduled}
            >ScheduledMessageCard</ScheduledMessageCard>
            </CardBody>
            </Card>
          )
        })}
        </CardColumns>
      </div>
    )
  }

}
