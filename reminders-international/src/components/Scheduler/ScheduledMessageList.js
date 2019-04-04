import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';

//TODO: update imports as needed
//TODO: connect to user account
//TODO: and connection to current group selection...
// ... (I guess group selection will be where scheduled messages are rendered from)

export default class ScheduledMessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      scheduled_reminders:[] 
       };
  }


  populateScheduledReminders = () => { //Called in getAllReminders below
    scheduledReminders = this.state.reminders.filter(function (reminders) {
      return reminders.scheduled === true;
    });
    this.setState({
      scheduled_reminders: scheduledReminders
    });
    console.log('populateScheduledReminders this.state.scheduled_reminders', this.state.scheduled_reminders);
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
    this.populateScheduledReminders()
  }

  componentDidMount () {
    this.getAllReminders();
  }

  render() {
    //TODO: pass props for approved toggle event handlers 
    //TODO: pass props for date picker event handler 
    //TODO: pass props for edit message handlers 
   
    return (
      <div className="template-list">
        <Container>
        <ul>
          <Row>
          {this.state.scheduled_reminders.map(scheduled_reminders => {
            return (
              <ScheduledMessageCard
                key={scheduled_reminders.id}
                reminder_id={scheduled_reminders.id}
                name={scheduled_reminders.name}
                description={scheduled_reminders.description}
                group_id={scheduled_reminders.group_id}
                user_id={scheduled_reminders.user_id}
                approved={scheduled_reminders.approved} //TODO - Add approval column to reminders 
                date={scheduled_reminders.date} //future feature - ability to schedule for multiple dates
              />
            )
          })}
          </Row>
        </ul>
        {/* TO DO: hook in 'Add Message' logic*/}
        <Button>Add Message</Button>
        </Container>
      </div>
    )
  }

}

