import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';

//TODO: update imports as needed
export default class ScheduledMessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      scheduled_reminders:[] //TO DO - create loop to select scheduled reminders 
                            //- if date add to scheduled reminders
    };
  }

  getAllReminders = () => {
    axios.get("https://reminders-international.herokuapp.com/api/reminders", this.state.reminders)
      .then(res => {
       console.log('list of all reminders', res.data);
        this.setState({
          reminders: res.data
        });
         console.log('getAllReminders this.state.reminders', this.state.reminders);
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
        <Container>
        <ul>
          <Row>
          {this.state.scheduled_reminders.map(reminder => {
            return (
              // TO DO: NEED Add Message button
              <ScheduledMessageCard
                key={reminder.id}
                reminder_id={reminder.id}
                name={reminder.name}
                description={reminder.description}
                group_id={reminder.group_id}
                user_id={reminder.user_id}
                approved={reminder.approved} //TODO - Add approval column to reminders 
                date={reminder.date} //future feature - ability to schedule for multiple dates
              />
            )
          })}
          </Row>
        </ul>
        </Container>
      </div>
    )
  }

}

