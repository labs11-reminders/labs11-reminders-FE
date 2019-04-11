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
        console.log("getting reminders")
        axios.get(`${process.env.REACT_APP_BACKEND}/api/reminders`, this.state.reminders)
          .then(res => {
             this.setState({
              reminders: res.data,
            });
           })
          .catch(err => {
            console.log("failed to get",err);
        });
        console.log("maybe",this.state.reminders);
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
        console.log("REMINDERS", this.state.reminders)
        console.log("FILTERED BY GROUP", this.state.reminders.group_reminders)
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


