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
          activeGroup:null,
          group_reminders: []
        }
    }

  
      getAllReminders = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/api/reminders`, this.state.reminders)
          .then(res => {
           console.log('list of all reminders', res.data);
            this.setState({
              reminders: res.data,
              activeGroup: this.props.state.activeGroup
            });
             console.log('getAllReminders this.state.reminders', this.state.group_reminders);
        })
          .catch(err => {
            console.log(err);
        });
       // this.populateScheduledReminders()
      }

      groupReminders () {
        console.log("FILTERED BY GROUP")
        for (let i = 0; i < this.state.reminders; i++) {
          if (this.state.reminder.group_id == this.state.activeGroup) {
            this.state.group_reminders.push(i);
          }
        }
        
      }
      
    
      componentDidMount () {
        console.log("mounted")
        this.getAllReminders();
        this.groupReminders();
      }
  

  
      render() {
        return (
          <div> 
           <h3>ScheduledMessageComposer</h3>
            <ScheduledMessageList group_reminders = {this.state.group_reminders} 
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


