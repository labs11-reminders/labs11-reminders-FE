import React from 'react';
//TODO: update imports as needed
//TODO: pass props for approved toggle event handler 
//TODO: pass props for edit message handler 
//TODO: update props list - line 6
const ScheduledMessageCard = (props) => {
  const { name, description, created_at, group_id, user_id, scheduled, draft, template } = props.template;
  return (
    <div className="scheduled-message-card">

      <div className="scheduled-message-title">
      <h2>{props.name}</h2>
      </div>

      <div className="scheduled-message-description">
        <h3>Message</h3>
        <p>{props.description}</p>
      </div>

      <div className="scheduled-message-date">
        <h3>Date to Send</h3>
        <p>{props.date}</p>
        <p>{props.approved}</p>
      </div>
    </div>
  );
};

export default ScheduledMessageCard;