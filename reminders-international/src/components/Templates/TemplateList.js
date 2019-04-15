import React, { Component } from 'react';
import axios from 'axios';
import TemplateCard from './TemplateCard';
import MessageModal from '../MessageModal/MessageModal';
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
      // editedReminder: '',
    };
  }

  getAllReminders = () => {
    axios.get(`${process.env.REACT_APP_BACKEND}/api/reminders`, this.state.reminders)
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
    console.log("Template list this.state", this.state)
    return (
      <div>
      <CardColumns className="template-list" sm="6">
        {this.state.reminders.map((reminder, index) => {
           if (reminder.group_id === this.props.activeGroup) {
          return (
          <Card>
            <CardBody key={reminder.id}> 
              <TemplateCard 
                id={reminder.id}
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
      })}
      </CardColumns>
      <MessageModal buttonLabel="Compose New Template"/>
      </div>
    )
  }

}

