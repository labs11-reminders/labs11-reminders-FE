import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TabsSection from './Tabs';
import AddContactModal from '../AddContacts/AddContactModal';
import axios from 'axios';

class MainContent extends Component {
  state = {};

  getGroupById = () => {
    axios.get(`${process.env.REACT_BACKEND_}`)
  }

  render() {
    return (
      <div className="mainContentWrapper">
        <section className="profileInfo">
          <div className="groupData">
            <span id="grpImage">Image</span> &nbsp;
            <div className="grpName">
              <span>
                <strong>{this.state.groups}</strong>
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
          <TabsSection />
          
        </section>
      </div>
    );
  }
}

export default MainContent;
