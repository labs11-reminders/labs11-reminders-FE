import React from 'react';
//TODO: update imports as needed
//TODO: pass props for approved toggle event handler 
//TODO: pass props for date picker event handler 
//TODO: pass props for edit message handler 
//TODO: update props list - line 6
const ScheduledMessageCard = (props) => {
  const { name, description, created_at, group_id, user_id, reminder_id, scheduled, draft, template } = props.scheduledMessageCard;
  return (

    <div className="scheduled-message-card">

      <div className="scheduled-message-title">
       {/* TO DO: edit button/handler call */}
      <h2>{props.name}</h2>
      </div>

      <div className="scheduled-message-description">
      {/* TO DO: edit button/handler call */}
        <h3>Message</h3>
        <p>{props.description}</p>
      </div>

      {/* TO DO: NEED calender*/}
      <FormGroup onClick={this.toggleApproved}> {/* TO DO: update handel call */}
          <Label for="checkbox_approve">approved</Label>
          <Input type="checkbox" approved="approved" id="checkbox_approve"/> 
        </FormGroup>
    </div>
  );
};

export default ScheduledMessageCard;