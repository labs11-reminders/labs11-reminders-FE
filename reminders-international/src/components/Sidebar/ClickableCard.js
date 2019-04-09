import React from 'react';


const ClickableCard = (props) => {
  // const { name, description, created_at, group_id, user_id, scheduled, draft, template } = props.template;
  return (
    <div className="side-template-card">
     <p>{props.name}</p>
    </div>
  );
};

export default ClickableCard;