import React from 'react';
import {
  // TabContent,
  // TabPane,
  // Nav,
  // NavItem,
  NavLink,
  // Card,
  // Button,
  CardTitle,
  CardSubtitle,
  CardText,
  // Row,
  // Col,
} from 'reactstrap';

const TemplateCard = (props) => {
  const { name, description, created_at, group_id, user_id, scheduled, draft, template } = props.template;
  return (
    <div className="template-card">
      {props.template ? (
        <div className="if-undefined-make-invisible-or-hidden">
      
          <CardTitle>{props.name}</CardTitle>
          <NavLink id="createLink" >
            <i className="fas fa-pencil-alt" /> &nbsp; </NavLink>
          <NavLink id="createLink" >
            <i className="fas fa-trash-alt" /> &nbsp;
          </NavLink>
          <div className="template-description">
            <CardSubtitle>Message</CardSubtitle>
            <CardText>{props.description}</CardText>
          </div>

          <CardText className="template-created">Date Created: {props.created_at}</CardText>
          <CardText className="template-created">Created By: {props.user_id}</CardText>
      
      </div>): undefined}
    </div>
  );
};

export default TemplateCard;