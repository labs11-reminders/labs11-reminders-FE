import React from 'react';

const SideTemplateCard = (props) => {
  console.log("SideTemplateCard", props)
  return (
    <div className="side-template-card">
      {props.name}
    </div>
  );
};

export default SideTemplateCard;