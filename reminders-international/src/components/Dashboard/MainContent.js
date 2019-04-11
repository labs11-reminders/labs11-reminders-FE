import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TabsSection from './Tabs';

class MainContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('MAIN CONTENT PROPS', this.props);
    return (
      <div className="mainContentWrapper">
        <section className="profileInfo">
          <div className="groupData">
            <span id="grpImage">Image</span> &nbsp;
            <div className="grpName">
              <span>
                <strong>
                  {!this.props.state.activeGroup === null ? (
                    <p>Group Name</p>
                  ) : (
                    this.props.state.groups.map(group => {
                      console.log(
                        '************************************',
                        group,
                        this.props.state.activeGroup,
                      );
                      if (this.props.state.activeGroup === group.id) {
                        return group.name;
                      }
                    })
                  )}
                </strong>
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
          <TabsSection />
        </section>
      </div>
    );
  }
}

export default MainContent;
