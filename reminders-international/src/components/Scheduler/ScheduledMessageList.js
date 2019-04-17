import React, { Component } from 'react';
import ScheduledMessageCard from './ScheduledMessageCard';
import './SchedulerB.css';
import {
  Card,
  CardColumns,
  CardBody,
  Row,
  Col,
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
        <div className="list">
           <div>
            {this.props.group_reminders.map(group_reminder => { //change to scheduled reminders when whe have them 
              if (group_reminder.group_id === this.props.activeGroup && group_reminder.scheduled) {
                {/* console.log("RENDERING SCHEDULED div", group_reminder) */}
                return (
                  <div>
                    <div key={group_reminder.id}>
                      <ScheduledMessageCard
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
                      sent = {group_reminder.sent}
                      >ScheduledMessageCard</ScheduledMessageCard>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      )
    }
  }