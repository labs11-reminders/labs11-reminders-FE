import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import NewGroupMessage from '../NewGroupMessage/NewGroupMessage';
import TemplateComposer  from '../Templates/TemplateComposer';
import DraftComposer  from '../Drafts/DraftComposer';
import ScheduleMessageComposer from '../Scheduler/ScheduleMessageComposer';
import People from '../People/People';
import classnames from 'classnames';


export default class TabsSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      user_id: null,
      role_id: null,
      org_id: null,
      group_id: null,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    console.log("TOGGLE TAB", this.state.activeTab, tab)
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
 
  render() {
    console.log("TABS.JS", this.state)
    console.log("TABS.JS", this.props)
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

        </Nav>
        <TabContent activeTab={this.state.activeTab} activeGroup={this.props.activeGroup}>
          
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <NewGroupMessage activeGroupUsers={this.props.activeGroupUsers} state={this.props.state} groups={this.props.groups} activeGroup={this.props.activeGroup}/>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="2">
          <Row>
              <Col sm="12">
              <div> 
              To create a new scheduled message, template, or a draft use the Messages tab 
              </div>
              <ScheduleMessageComposer activeGroupUsers={this.props.activeGroupUsers} state={this.props.state} groups={this.props.groups} activeGroup={this.props.activeGroup}/>
              </Col>
           </Row>
          </TabPane>

          <TabPane tabId="3">
          <Row>
               <Col sm="12">
               <div> 
              To create a new scheduled message, template, or a draft use the Messages tab 
              </div>
                <TemplateComposer activeGroupUsers={this.props.activeGroupUsers} state={this.props.state} groups={this.props.groups} activeGroup={this.props.activeGroup}/>
              </Col>
           </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
              <div> 
              To create a new scheduled message, template, or a draft use the Messages tab 
              </div>
                <DraftComposer activeGroupUsers={this.props.activeGroupUsers} state={this.props.state} groups={this.props.groups} activeGroup={this.props.activeGroup}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
            <Row>
              <Col sm="12">
                <People activeGroupUsers={this.props.activeGroupUsers} state={this.props.state} groups={this.props.groups} activeGroup={this.props.activeGroup}  />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
 