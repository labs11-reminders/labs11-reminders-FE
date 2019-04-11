import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TabsSection from './Tabs';
import AddContactModal from '../AddContacts/AddContactModal';
import axios from 'axios';

class MainContent extends Component {
<<<<<<< HEAD
  state = {};

  getGroupById = () => {
    axios.get(`${process.env.REACT_BACKEND_}`)
=======
  constructor(props) {
    super(props);
>>>>>>> b32f241ebf4aeb663d321ea6fa055de1189792c0
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
<<<<<<< HEAD
                <strong>{this.state.groups}</strong>
=======
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
>>>>>>> b32f241ebf4aeb663d321ea6fa055de1189792c0
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
