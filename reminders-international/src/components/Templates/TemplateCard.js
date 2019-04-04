import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';

const TemplateCard = (props) => {
  const { name, description, created_at, group_id, user_id, scheduled, draft, template } = props.template;
  return (
    <div className="template-card">

      <CardTitle>{props.name}</CardTitle>

      <div className="template-description">
        <CardSubtitle>Message</CardSubtitle>
        <CardText>{props.description}</CardText>
      </div>

      <div className="template-created">
        <CardText>Date Created: {props.created_at}</CardText>
        <CardText>Created By: {props.user_id}</CardText>
      </div>

      <div className="template-group_id">
        <CardText>Group:{props.group_id}</CardText>
      </div>

      <div className="template-type">
        <CardText>Type of Reminder:</CardText>
        <CardText>scheduled: {props.scheduled ? 'true': 'false'}</CardText>
        <CardText>draft: {props.draft ? 'true': 'false'}</CardText>
        <CardText>template: {props.template ? 'true': 'false'}</CardText>
      </div>
    </div>
  );
};

export default TemplateCard;