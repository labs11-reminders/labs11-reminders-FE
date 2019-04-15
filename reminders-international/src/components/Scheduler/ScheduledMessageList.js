import React, { Component } from 'react';
import ScheduledMessageCard from './ScheduledMessageCard';
import {
  Card,
  CardColumns,
  CardBody,
} from 'reactstrap';

export default class ScheduledMessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group_reminders: [],
    };

  }

    render() {
      return(
      <div className="scheduled-list">
      ScheduledMessageList
      <CardColumns sm="6">
          {this.props.reminders.map(group_reminder => { //change to scheduled reminders when whe have them 
            if (group_reminder.group_id === this.props.activeGroup) {
              {/* console.log("RENDERING SCHEDULED CARD ", group_reminder) */}
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
            )}
          })}
          </CardColumns>
        </div>
      )
    }
  }