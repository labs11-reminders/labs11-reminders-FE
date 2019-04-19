import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TemplateList from './TemplateList';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import axios from 'axios';
import '../Scheduler/TabMessageStyles.css';
import '../global.css';
class TemplateComposer extends Component {
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
        // <MessageModalGroup groups = {this.props.groups} state ={this.props.state} buttonLabel="Create New Template" />
        //console.log("REMINDERS render", this.props.activeGroup, this.state.reminders)
        return (
          <div className="composer"> 
           
            <TemplateList activeGroup={this.props.activeGroup} reminders={this.state.reminders}/>
           
          </div>
        );
  };
}
export default TemplateComposer;

