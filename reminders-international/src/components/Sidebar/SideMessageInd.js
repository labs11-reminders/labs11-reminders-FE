import React from 'react';
import {
} from 'reactstrap';

const SideTemplateCard = (props) => {
  return (
    <div className="side-template-card">
      {props.name}
      {/* {props.scheduled ? (<p>{props.name}</p>): undefined} */}
    </div>
  );
};

export default SideTemplateCard;