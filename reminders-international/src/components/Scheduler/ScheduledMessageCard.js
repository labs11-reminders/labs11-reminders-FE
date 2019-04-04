import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from "../DatePicker/dp_index";

const ScheduledMessageCard = (props) => {
  const { onEditMessage, onEditTitle, onDatePicker, toggleApprove, name, description, created_at, group_id, user_id, reminder_id, scheduled_reminders_id, scheduled, draft, template } = props.scheduledMessageCard;
  return (

    <div className="scheduled-message-card">

      <div className="scheduled-message-title">
      <h2>{props.name}</h2>
      <Button onClick={props.onEditTitle()} id = {props.scheduled_reminders_id}/>
      </div>

      <div className="scheduled-message-description">
        <h3>Message</h3>
        <p>{props.description}</p>
        <Button onClick={this.props.onEditMessage()} id = {props.scheduled_reminders_id}/>
      </div>

      {/* TODO - Finish Calendar - <div className="w-25 py-5 my-5 mx-auto">
        <DatePicker label="Birthday" value="2000-08-15" />
  </div>*/}

      <div className='check_box'>
      <FormGroup onClick={props.toggleApprove()} id = {props.scheduled_reminders_id}> 
          <Label for="checkbox_approve">approved</Label>
          <Input type="checkbox" approved="approved" id="checkbox_approve"/> 
        </FormGroup>
      </div>
    </div>
  );
};

export default ScheduledMessageCard;
