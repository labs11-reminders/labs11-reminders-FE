import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TabsSection from './Tabs';
import ScheduleMessageComposer from '../Scheduler/ScheduleMessageComposer';

class MainContent extends Component {
  state = {};
  render() {
    return (
      <div className="mainContentWrapper">
        <section className="profileInfo">
          <div className="groupData">
            <span id="grpImage">Image</span> &nbsp;
            <div className="grpName">
              <span>
                <strong>Group Name</strong>
              </span>{' '}
              &nbsp;
              <span>@groupname</span>
            </div>
          </div>
          <div className="topBtn">
            <Button outline color="primary">
              Add Contacts
            </Button>
          </div>
        </section>
        <section className="tabSection">
          <ScheduleMessageComposer></ScheduleMessageComposer>
          <TabsSection />
          
        </section>
      </div>
    );
  }
}

export default MainContent;
