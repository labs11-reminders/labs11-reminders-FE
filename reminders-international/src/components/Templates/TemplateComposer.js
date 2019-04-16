import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TemplateList from './TemplateList';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import axios from 'axios';

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
        //console.log("REMINDERS render", this.props.activeGroup, this.state.reminders)
        return (
          <div> 
           <h3>TemplateComposer</h3>
            <TemplateList activeGroup={this.props.activeGroup} reminders={this.state.reminders}/>
            <div>
            <MessageModalGroup groups = {this.props.groups} state ={this.props.state} buttonLabel="Add Group Message Template" />
              </div>
          </div>
        );
  };
}
export default TemplateComposer;

