import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';
import ScheduledMessageList from './ScheduledMessageList';
import axios from 'axios';

class ScheduleMessageComposer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: {
            title: '', 
            to: '',// TODO: props from user group list 
            body: '',
            approved: false, // TODO: create approved column for backend - change worker.py to reflect change
            date: '',//TODO: set from react datetime selector 
            scheduled: true //NOTE: scheduled is toggled to true in 'MessageModal'
          },
          submitting: false,
          error: false
        };
        this.toggleApprove = this.toggleApprove.bind(this);
      }

      //------ Get scheduled message by ID, and update state --------
      fetchReminder = id => {
        axios
          .get(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`)
          .then(response => {
            this.setState(() => ({ message:response.data}));
          })
          .catch(err => {
            console.log(err)
          });
      }

      componentDidMount () {
        const id = this.props.match.params.id;
        this.fetchReminder(id);
      }

      handleChange = (event,id) => {
        event.preventDefault();
        this.setState({ submitting: true });
        fetch(`${process.env.REACT_APP_BACKEND}/api/reminders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          to: this.state.to,
          body: JSON.stringify(this.state.message),
          approved: this.state.approved, 
          date: this.state.date,
          scheduled: this.state.scheduled
        })
          .then(res => {
            if (res.status === 200) {
              console.log('scheduling message');
              this.setState({
                error: false,
                submitting: true,
              });
            } else {
              this.setState({
                error: true,
                submitting: false
              });
            }
            res.json()
          })
          .catch(err => {
            console.log(err)
          })
      }

      //------ Edit  handlers triggered in ScheduledMessageCard --------
      onEditTitle  = (event, id) => {
        const title_input = event.target.getAttribute('title');
        this.setState({
          title: { ...this.state.title, [title_input]: event.target.value }
        });
        this.handleChange(event,id);
      }
      onEditMessage = (event, id) => {
        const message_input = event.target.getAttribute('message');
        this.setState({
          message: { ...this.state.message, [message_input]: event.target.value }
        });
        this.handleChange(event,id);
      }

      //------ Date handlers triggered in ScheduledMessageCard --------
      onDatePicker = (event,id) => {  
        //NEEDS TO BE EDITED 
        this.handleChange(event,id);
      }

      toggleApproved(event,id) {
        this.setState(prevState => ({
          approved: !prevState
        }));
        this.handleChange(event,id);

      }

  
      render() {
        return (
          <div>
            <ScheduledMessageList toggleApprove={this.toggleApprove} 
            onEditMessage={this.onEditMessage} 
            onEditTitle={this.onEditTitle}
            onDatePicker={this.onDatePicker}/>
          </div>
        );
  };
}
export default ScheduleMessageComposer;


