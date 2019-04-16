import React, { Component } from 'react';
import TemplateCard from './TemplateCard';
import {
  Card,
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
    };
  }

  render() {
    //console.log("Template list this.state", this.state)
    return (
      <div className="scheduled-list">
        TemplateList
      <CardColumns className="template-list" sm="6">
       {this.props.reminders.map(reminder => { 
            if (reminder.group_id === this.props.activeGroup) {
              /* console.log("RENDERING TEMPLATE CARD ", reminder) */
            return (
              <Card>
              <CardBody key={reminder.id}>
              <TemplateCard 
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
              template = {reminder.template}
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

