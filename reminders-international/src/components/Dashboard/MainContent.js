import React, { Component } from 'react';
import TabsSection from './Tabs';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
  Col,
} from 'reactstrap';
import AddContactModal from '../AddContacts/AddContactModal';
import axios from 'axios';

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.toggleEditUser = this.toggleEditUser.bind(this);
    this.toggleEditGroup = this.toggleEditGroup.bind(this);
    this.toggleEditOrg = this.toggleEditOrg.bind(this);
    this.toggleDeleteWarning = this.toggleDeleteWarning.bind(this);

    this.state = {
      dropdownOpen: false,
      editUserModal: false,
      editGroupModal: false,
      editOrgModal: false,
      warningModal: false,
    };
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggleEditUser() {
    console.log('Edit User Clicked');
    this.setState(prevState => ({
      editUserModal: !prevState.editUserModal,
    }));
  }

  toggleEditGroup() {
    console.log('Edit Group Clicked');
    this.setState(prevState => ({
      editGroupModal: !prevState.editGroupModal,
    }));
  }

  toggleEditOrg() {
    console.log('Edit Org Clicked');
    this.setState(prevState => ({
      editOrgModal: !prevState.editOrgModal,
    }));
  }

  toggleDeleteWarning() {
    console.log('DELETE!!!');
    this.setState(prevState => ({
      warningModal: !prevState.warningModal,
    }));
  }

  handleInputChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    console.log('MAIN CONTENT PROPS', this.props.state);
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
              <AddContactModal buttonLabel="Add Contact" />
            </Button>
            &nbsp;
            {/********************************************************** SETTINGS DROPDOWN ********************************************/}
            <Dropdown
              id="topSettings"
              isOpen={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle tag="a" caret>
                <i class="fas fa-cog fa-2x" />
              </DropdownToggle>
              <DropdownMenu id="drpMenu">
                <DropdownItem onClick={this.toggleEditUser} id="drpItem">
                  Edit User
                </DropdownItem>

                <DropdownItem onClick={this.toggleEditGroup} id="drpItem">
                  Edit Group
                </DropdownItem>

                <DropdownItem onClick={this.toggleEditOrg} id="drpItem">
                  Edit Organization
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/****************************************************** Edit User Modal **********************************************/}
          <Modal
            isOpen={this.state.editUserModal}
            toggle={this.toggleEditUser}
            className="groupModal"
            size="lg"
          >
            <ModalHeader toggle={this.toggleEditUser}>Edit User</ModalHeader>
            <ModalBody className="modalBody">
              <Form className="createGroup" onSubmit={null}>
                <FormGroup row>
                  <Label for="name">Name</Label>
                  <Col sm={10}>
                    <Input
                      onChange={this.handleInputChange}
                      placeholder="Name"
                      type="name"
                      value={this.state.name}
                      name="name"
                      id="name"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="email">Email</Label>
                  <Col sm={10}>
                    <Input
                      placeholder="Email"
                      type="email"
                      value={this.state.email}
                      name="email"
                      id="email"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="country">Phone</Label>
                  <Col sm={10}>
                    <Input
                      placeholder="Phone"
                      type="number"
                      value={this.state.phone}
                      name="phone"
                      id="phone"
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={this.addGroup}>
                Update
              </Button>
              <Button color="primary" onClick={this.toggleEditUser}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/****************************************************** Edit Group Modal **********************************************/}
          <Modal
            isOpen={this.state.editGroupModal}
            toggle={this.toggleEditGroup}
            className="groupModal"
            size="lg"
          >
            <ModalHeader toggle={this.toggleEditGroup}>Edit Group</ModalHeader>
            <ModalBody className="modalBody">
              <Form className="createGroup" onSubmit={null}>
                <FormGroup row>
                  <Label for="name">Group Name</Label>
                  <Col sm={10}>
                    <Input
                      onChange={this.handleInputChange}
                      placeholder="Name"
                      value={this.state.groupName}
                      name="name"
                      id="name"
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={this.editGroup}>
                Update
              </Button>{' '}
              <Button color="danger" onClick={this.toggleDeleteWarning}>
                Delete Group
              </Button>
            </ModalFooter>
          </Modal>

          {/****************************************************** Edit Org Modal **********************************************/}
          <Modal
            isOpen={this.state.editOrgModal}
            toggle={this.toggleEditOrg}
            className="groupModal"
            size="lg"
          >
            <ModalHeader toggle={this.toggleEditOrg}>Edit Group</ModalHeader>
            <ModalBody className="modalBody">
              <Form className="createGroup" onSubmit={null}>
                <FormGroup row>
                  <Label for="name">Organization</Label>
                  <Col sm={10}>
                    <Input
                      onChange={this.handleInputChange}
                      placeholder="Name"
                      value={this.state.orgName}
                      name="name"
                      id="name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="description">Description</Label>
                  <Col sm={10}>
                    <Input
                      onChange={this.handleInputChange}
                      placeholder="Description"
                      value={this.state.description}
                      name="description"
                      id="description"
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={this.toggleEditOrg}>
                Update
              </Button>{' '}
              <Button color="danger" onClick={this.toggleDeleteWarning}>
                Delete Organization
              </Button>
            </ModalFooter>
          </Modal>

          {/************************************ Nested modal for Delete Warning popup ************************************/}
          <Modal
            id="alertModalWrap"
            isOpen={this.state.warningModal}
            toggle={this.toggleDeleteWarning}
          >
            <ModalBody id="alertModal">
              Are you sure you want to delete? This is NOT Reversible!
            </ModalBody>
            <ModalFooter id="alertModalFooter">
              <Button color="danger" onClick={this.toggleDeleteWarning}>
                Yes!
              </Button>
              <Button color="primary" onClick={this.toggleDeleteWarning}>
                No!
              </Button>
            </ModalFooter>
          </Modal>
        </section>
        <section className="tabSection">
          <TabsSection
            state={this.props.state}
            activeGroup={this.props.activeGroup}
            groups={this.props.groups}
          />
        </section>
      </div>
    );
  }
}

export default MainContent;
