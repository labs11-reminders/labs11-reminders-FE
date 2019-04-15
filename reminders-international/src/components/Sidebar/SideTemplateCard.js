import React from 'react';

const SideTemplateCard = (props) => {
  return (
    <div className="side-template-card">
      {props.scheduled ? (<p>{props.name}</p>): undefined}
    </div>
  );
};

export default SideTemplateCard;