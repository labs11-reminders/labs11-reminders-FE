import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import ScheduledMessageList from './ScheduledMessageList';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import axios from 'axios';
import './TabMessageStyles.css';
import '../global.css';

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
        const btnPrimary = {
          color: '#fff',
          backgroundColor: '#3a9bd8',
          borderColor: '#3a9bd8'
      };
                
        return (
          <div className="composer"> 
            <MessageModalGroup id="button" groups = {this.props.groups} state ={this.props.state} type="button" buttonLabel="Schedule a New Message" /> 
            <ScheduledMessageList 
              activeGroup={this.props.activeGroup} 
              group_reminders={this.state.group_reminders}/>
              
          </div>
        );
  };
}
export default ScheduleMessageComposer;


