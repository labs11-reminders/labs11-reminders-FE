import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ScheduledMessageList from './ScheduledMessageList';
import MessageModal from '../MessageModal/MessageModal';
import axios from 'axios';

class ScheduleMessageComposer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          reminders:[],
        }
    }

  
      getAllReminders = () => {
        axios.get(`https://reminders-international.herokuapp.com/api/reminders`, this.state.reminders)
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
       // this.populateScheduledReminders()
      }
    
      componentDidMount () {
        console.log("mounted")
        this.getAllReminders();
      }

  
      render() {
        return (
          <div> 
           <h3>ScheduledMessageComposer</h3>
            <ScheduledMessageList reminders = {this.state.reminders} 
            />
            <div>
            <Button>
                <MessageModal buttonLabel="Add Scheduled Message" />  
              </Button>
              </div>
          </div>
        );
  };
}
export default ScheduleMessageComposer;


