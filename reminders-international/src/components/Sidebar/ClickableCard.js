import React from 'react';


const ClickableCard = (props) => {
  return (
    <div className={props.className}>
     <p>{props.name}</p>
    </div>
  );
};

export default ClickableCard;