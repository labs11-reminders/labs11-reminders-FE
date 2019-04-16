import React from 'react';
import MessageModalInd from '../MessageModal/MessageModalInd';

const SideTemplateCard = (props) => {
  return (
    <div className="side-template-card">
      {/* {props.scheduled ? (<p>{props.name}</p>): undefined} */}
      <MessageModalInd buttonLabel="Message An Individual" />
    </div>
  );
};

export default SideTemplateCard;