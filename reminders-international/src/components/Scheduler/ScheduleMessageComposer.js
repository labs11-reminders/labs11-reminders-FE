import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import ScheduledMessageList from './ScheduledMessageList';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import axios from 'axios';
import './SchedulerB.css';

class ScheduleMessageComposer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          reminders:[],
          group_reminders: []
        };
    }

    getReminders = () => {
      axios.get(`${process.env.REACT_APP_BACKEND}/api/reminders/`, this.state.group_reminders)
          .then(res => { 
            this.setState({
              group_reminders: res.data
            });})
          .catch(err => {
            console.log(err);
          });}
    
   
      componentWillReceiveProps() {
        this.getReminders();
        console.log("ACTIVE ID - COMPOSER- will recieve", this.props.activeGroup)
      }
// removed Container
      
      render() {
        return (
          <div className="composer"> 
          <MessageModalGroup groups = {this.props.groups} state ={this.props.state} buttonLabel="Schedule Group Message" />  
            <ScheduledMessageList 
              activeGroup={this.props.activeGroup} 
              group_reminders={this.state.group_reminders}/>
              
          </div>
        );
  };
}
export default ScheduleMessageComposer;


