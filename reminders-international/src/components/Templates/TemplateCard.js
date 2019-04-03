import React from 'react';

const TemplateCard = (props) => {
  const { name, description, created_at, group_id, user_id, scheduled, draft, template } = props.template;
  return (
    <div className="template-card">

      <h2>{props.name}</h2>

      <div className="template-description">
        <h3>Message</h3>
        <p>{props.description}</p>
      </div>

      <div className="template-created">
        <p>Date Created: {props.created_at}</p>
        <p>Created By: {props.user_id}</p>
      </div>

      <div className="template-group_id">
        <p>Group:{props.group_id}</p>
      </div>

      <div className="template-type">
        <p>Type of Reminder:</p>
        <p>scheduled: {props.scheduled ? 'true': 'false'}</p>
        <p>draft: {props.draft ? 'true': 'false'}</p>
        <p>template: {props.template ? 'true': 'false'}</p>
      </div>
    </div>
  );
};

export default TemplateCard;