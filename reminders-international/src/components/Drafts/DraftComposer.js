import React, { Component } from 'react';
import { Button } from 'reactstrap';
import DraftList from './DraftList';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import axios from 'axios';

class DraftComposer extends Component {
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
    }

      
      render() {
        // console.log("RENDERING SCHEDULED MESSAGE LIST ", this.state.reminders)
        //console.log("REMINDERS render", this.props.activeGroup, this.state.reminders)
        return (
          <div> 
           <h3>DraftComposer</h3>
            <DraftList activeGroup={this.props.activeGroup} reminders={this.state.reminders}/>
            <div>
            <MessageModalGroup groups = {this.props.groups} state ={this.props.state} buttonLabel="Write Group Draft Message" />
              </div>
          </div>
        );
  };
}
export default DraftComposer;

