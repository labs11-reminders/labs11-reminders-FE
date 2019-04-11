import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TabsSection from './Tabs';
import AddContactModal from '../AddContacts/AddContactModal';
import axios from 'axios';

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
                  {!this.props.activeGroup === null ? (
                    <p>Group Name</p>
                  ) : (
                    this.props.groups.map(group => {
                      console.log(
                        '************************************',
                        group,
                        this.props.activeGroup,
                      );
                      if (this.props.activeGroup === group.id) {
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
              <AddContactModal buttonLabel = "Add Contact" />
            </Button>
          </div>
        </section>
        <section className="tabSection">
          <TabsSection state={this.props.state} activeGroup={this.props.activeGroup} />
        </section>
      </div>
    );
  }
}

export default MainContent;
