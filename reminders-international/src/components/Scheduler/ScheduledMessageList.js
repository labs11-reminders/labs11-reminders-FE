import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import MessageModal from '../MessageModal/MessageModal';
import ScheduledMessageCard from './ScheduledMessageCard';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
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
    const scheduledReminders = this.state.reminders.filter(function (reminders) {
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
     
    return (
      <div className="scheduled-reminders-list">
        <Container>
        <ul>
          <Row>
          {this.state.scheduled_reminders.map(scheduled_reminders => {
            return (
              <ScheduledMessageCard
                key={scheduled_reminders.id}
                scheduled_reminder_id={scheduled_reminders.id}
                name={scheduled_reminders.name}
                description={scheduled_reminders.description}
                group_id={scheduled_reminders.group_id}
                user_id={scheduled_reminders.user_id}
                approved={scheduled_reminders.approved} //TODO - Add approval column to reminders 
                date={scheduled_reminders.date} //future feature - ability to schedule for multiple dates
                toggleApprove={this.props.toggleApprove} 
                onEditMessage={this.props.onEditMessage} 
                onEditTitle={this.props.onEditTitle}
                onDatePicker={this.props.onDatePicker} 
              />
            )
          })}
          </Row>
        </ul>
        <Button>
          <MessageModal buttonLabel="Add Scheduled Message" />  
        </Button>
        </Container>
      </div>
    )
  }
}
/*

render() {
    return (
      <div className="notes-list">
        {this.props.notes.map(note => (
         <Link to={`/notes/${note.id}`} key={note.id}>
          <SingleNoteDetails key={note.id} note={note}/>
         </Link>
        ))}
      </div>
    );
  }

//created by NotesContainer via routing 
import React, { Component } from 'react';
import EditBar from './EditBar.js';

export default class SingleNote extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props)
    const id = this.props.match.params.id;
    this.props.fetchNote(id);
  } // fetchNote lives in app.js

  render() {
    if (!this.props.singleNote) {
      return <div>Loading note information...</div>;
    }
    
    const { title, content} = this.props.singleNote[0];

    return (
      <div className="note-card">
        <div className="note-title">
          <h2>{title}</h2>
          </div>
          <div className="note-body">
            <p>{content}</p>
          </div>
         
          <EditBar deleteNote={this.props.deleteNote}  handleInputChange={this.props.handleInputChange} singleNote = {this.props.singleNote} id = {this.props.match.params.id}
             />
        </div>
    );
  }
}
*/