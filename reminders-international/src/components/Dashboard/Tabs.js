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
import axios from 'axios';
import NewGroupMessage from '../NewGroupMessage/NewGroupMessage';
import TemplateList  from '../Templates/TemplateList';
import DraftList  from '../Drafts/DraftList';
import ScheduleMessageComposer from '../Scheduler/ScheduleMessageComposer';
import People from '../People/People';
import classnames from 'classnames';


export default class TabsSection extends React.Component {

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
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
    console.log("TABS ACTIVE GROUP", this.props.activeGroup)
    console.log("TABS GROUP REMINDERS", this.state.group_reminders)
    console.log("TABS USERS", this.state.users)
  }
/*
  getRemindersByGroup = () => {
    console.log("Reminders --  active group", this.props.activeGroup)
     axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/reminders/${this.props.activeGroup}`, this.state.group_reminders)
         .then(res => { 
            this.setState({
             group_reminders: res.data
           });})
         .catch(err => {
           console.log(err);
         });}

  getUserInfo = () => {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        axios.post(`${process.env.REACT_APP_BACKEND}/api/users/auth`, {auth0_sub: profile.sub})
            .then(res => {
              return axios.get(`${process.env.REACT_APP_BACKEND}/api/users/data/${this.user.id}`, this.user.auth0_sub)
            })
            .then(res => {
              this.setState({
              user: res.data
              });
            })
            .catch(err => {
              console.log(err);
            })     
            }
          });   
        }

  getUsersByGroup = () => {
    console.log("PeopleTable getUsersByGroup this.state", this.props.activeGroup)
    console.log("this.state.group", this.props.activeGroup)
    // if (!this.state.group.id) {
    //   this.state.group.id = 2;
    // }
      //group id is hardcoded in - need to change it to pull id from props
      console.log('getting users by group');
      axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/${this.props.activeGroup}/users`, this.state.users)
        .then(res => { 
          console.log(res, res.data) 
          this.setState({
              users: res.data
          });
      })
      .catch(err => {
          console.log(err);
      });
  }

  componentDidMount() {
      console.log('People table mounted');
      this.getUsersByGroup();
      this.getRemindersByGroup();
  } */

 
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
            <ScheduleMessageComposer activeGroup={this.props.activeGroup}/>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">

                <TemplateList activeGroup={this.props.activeGroup} activeGroupReminders={this.props.activeGroupReminders}/>

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
                <People activeGroup={this.props.activeGroup}  />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
 