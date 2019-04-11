import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  // Card,
  // Button,
  // CardTitle,
  // CardText,
  Row,
  Col,
} from 'reactstrap';

import NewGroupMessage from '../NewGroupMessage/NewGroupMessage';
import TemplateList  from '../Templates/TemplateList';
import DraftList  from '../Drafts/DraftList';
import Scheduler from '../Scheduler/ScheduleMessageComposer';
import People from '../People/People';
import classnames from 'classnames';


export default class TabsSection extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      user_id: null,
      role_id: null,
      org_id: null,
      group_id: null,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
  
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              <strong id="tabNav">MESSAGES</strong>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                console.log("SCHEDULER")
                this.toggle('2');
              }}
            >
              <strong id="tabNav">SCHEDULER</strong>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              <strong id="tabNav">TEMPLATES</strong>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => {
                this.toggle('4');
              }}
            >
              <strong id="tabNav">DRAFTS</strong>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => {
                this.toggle('5');
              }}
            >
              <strong id="tabNav">PEOPLE</strong>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '6' })}
              onClick={() => {
                this.toggle('6');
              }}
            >
              <strong id="tabNav">ADMIN</strong>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} activeGroup={this.props.activeGroup}>
          
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <NewGroupMessage state = {this.props.state} activeGroup={this.props.activeGroup}/>
              </Col>
            </Row>
          
          </TabPane>
          <TabPane tabId="2">
            <Scheduler state={this.props.state} activeGroup={this.props.activeGroup}/>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <TemplateList activeGroup={this.props.activeGroup}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                <DraftList activeGroup={this.props.activeGroup}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
            <Row>
              <Col sm="12">
                <People activeGroup={this.props.activeGroup} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
