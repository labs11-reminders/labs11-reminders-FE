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

const SideTemplateCard = (props) => {
  const { name, description, created_at, group_id, user_id, scheduled, draft, template } = props.template;
  return (
    <div className="side-template-card">
      {props.scheduled ? (<p>{props.name}</p>)
  : undefined}
      {/* <CardTitle>{props.name}</CardTitle> */}

      {/* <CardText>scheduled: {props.scheduled ? 'true': 'false'}</CardText> */}
    </div>
  );
};

// { this.state.message
//   ? (<h4>{this.state.message}</h4>)
//   : undefined
// }

export default SideTemplateCard;