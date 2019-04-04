import React, { Component } from 'react';
import ScheduledMessageCard from './ScheduledMessageCard';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardDeck,
  CardColumns,
  CardBody,
  Button,
  CardTitle,
  CardText,
} from 'reactstrap';

//TODO: update imports as needed
//TODO: connect to user account
//TODO: and connection to current group selection...
// ... (I guess group selection will be where scheduled messages are rendered from)

export default class ScheduledMessageList extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    return(
    <div className="scheduled-list">
    ScheduledMessageList
    <CardColumns sm="6">
        {this.props.reminders.map(reminder => { //change to scheduled reminders when whe have them 
          return (
            
            <Card>
              <CardBody>
            <ScheduledMessageCard //ADD approved and date
              key={reminder.id}
              name={reminder.name}
              description={reminder.description}
              created_at={reminder.created_at}
              group_id={reminder.group_id}
              user_id={reminder.user_id}
              scheduled={reminder.scheduled}
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
