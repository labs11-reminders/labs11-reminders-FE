import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import ScheduledMessageList from './ScheduledMessageList';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import axios from 'axios';
import './Scheduler.css';

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
              reminders: res.data
            });})
          .catch(err => {
            console.log(err);
          });}
    
   
      componentWillReceiveProps() {
        this.getReminders();
        console.log("ACTIVE ID - COMPOSER- will recieve", this.props.activeGroup)
      }

      
      render() {
        // console.log("RENDERING SCHEDULED MESSAGE LIST ", this.state.reminders)
        // console.log("ACTIVE ID - COMPOSER - render", this.props.activeGroup)
        return (
          <Container className="scheduleMessageComposer"> 
            {/* <h3>ScheduledMessageComposer</h3> */}
            <ScheduledMessageList 
              activeGroup={this.props.activeGroup} 
              reminders={this.state.reminders}/>
            {/* <div> */}
              <MessageModalGroup groups = {this.props.groups} state ={this.props.state} buttonLabel="Schedule Group Message" />  
            {/* </div> */}
          </Container>
        );
  };
}
export default ScheduleMessageComposer;


