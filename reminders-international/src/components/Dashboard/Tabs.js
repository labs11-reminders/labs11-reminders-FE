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
  CardText,
  Row,
  Col,
} from 'reactstrap';
import TemplateList from '../Templates/TemplateList';
import NewGroupMessage from '../NewGroupMessage/NewGroupMessage';
import People from '../People/People';
import classnames from 'classnames';

export default class TabsSection extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
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
                this.toggle('2');
              }}
            >
              <strong id="tabNav">TEMPLATES</strong>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              <strong id="tabNav">PEOPLE</strong>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <NewGroupMessage />
              </Col>
            </Row>
          
          </TabPane>
          <TabPane tabId="2">
            <TemplateList/>
          </TabPane>
          
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <People />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
