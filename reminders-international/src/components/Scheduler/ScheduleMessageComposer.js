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

    getRemindersByGroup = () => {
      console.log("People --  getUsersByGroup this.state", this.props.activeGroup)
      console.log("this.state.group", this.props.activeGroup)
      // if (!this.state.group.id) {
      //   this.state.group.id = 2;
      // }          
        console.log('getting users by group');
        axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/reminders/${this.props.activeGroup}`, this.state.group_reminders)
          .then(res => { 
            console.log(res, res.data) 
            this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    
      componentDidMount () {
        console.log("mounted")
        this.getRemindersByGroup();
        console.log("FILTERED BY GROUP", this.state.group_reminders)
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


