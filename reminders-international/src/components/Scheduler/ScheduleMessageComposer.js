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
          group_reminders: []
        }
    }

    getRemindersByGroup = () => {
      console.log("Reminders --  getUsersByGroup this.state", this.props.activeGroup)
        
      axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/reminders/${this.props.activeGroup}`, this.state.group_reminders)
          .then(res => { 
            console.log(res, res.data) 
            this.setState({
                group_reminders: res.data
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
            <ScheduledMessageList group_reminders = {this.state.group_reminders} activeGroup={this.props.activeGroup}
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


