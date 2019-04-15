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
      groupName: '',
      orgName: '',
      description: '',
      deleting: 0,
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
    this.setState({ deleting: 1 });
  }

  toggleEditOrg() {
    console.log('Edit Org Clicked');
    this.setState(prevState => ({
      editOrgModal: !prevState.editOrgModal,
    }));
    this.setState({ deleting: 2 });
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

  editGroup = () => {
    console.log(
      '************ GROUP UPDATE***************',
      this.props.state.activeGroup,
      'STATE GROUPNAME:',
      this.state.groupName,
    );

    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/api/groups/${
          this.props.state.activeGroup
        }`,
        { name: this.state.groupName },
      )
      .then(res => {
        console.log('Updated groups', res);
        if (res.status === 200 || res.status === 201) {
          this.setState({
            groupName: '',
          });
          this.setState(prevState => ({
            editGroupModal: !prevState.editGroupModal,
          }));
          this.props.getGroups();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // TODO TEAM: Delete Group 
  deleteGroup = () => {
    console.log(
      '************ GROUP DELETE***************',
      this.props.state.activeGroup,
    );

    axios
      .delete(
        `${process.env.REACT_APP_BACKEND}/api/groups/${
          this.props.state.activeGroup
        }`,
      )
      .then(res => {
        console.log('Deleted Group', res);
        if (res.status === 200 || res.status === 201) {
          this.setState({
            deleting: 0,
          });
          this.setState(prevState => ({
            warningModal: !prevState.warningModal,
          }));
          this.setState(prevState => ({
            editGroupModal: !prevState.editGroupModal,
          }));
          this.props.getGroups();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // TODO TEAM Warning on line 165: Expected a return value ...
  render() {
    console.log('THE MAIN CONTENT PROPS', this.props.state, this.state);
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
              <AddContactModal activeGroup={this.props.activeGroup} buttonLabel="Add Contact" />
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
              <Form className="createGroup" onSubmit={this.editGroup}>
                <FormGroup row>
                  <Label for="groupName">Group Name</Label>
                  <Col sm={10}>
                    <Input
                      onChange={this.handleInputChange}
                      placeholder={
                        this.props.state.activeGroup === null
                          ? 'Name'
                          : this.props.state.activeGroupName
                      }
                      value={this.state.groupName}
                      name="groupName"
                      id="groupName"
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

          {/** Nested Modal for Delete Warning popup **/}
          <Modal
            id="alertModalWrap"
            isOpen={this.state.warningModal}
            toggle={this.toggleDeleteWarning}
          >
            <ModalBody id="alertModal">
              Are you sure you want to delete {this.props.state.activeGroupName}
              ? This is NOT Reversible!
            </ModalBody>
            <ModalFooter id="alertModalFooter">
              {this.state.deleting === 1 ? (
                <Button color="danger" onClick={this.deleteGroup}>
                  Yes!
                </Button>
              ) : (
                <Button color="danger" onClick={this.toggleDeleteWarning}>
                  Yes!
                </Button>
              )}
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
            activeGroupUsers={this.props.activeGroupUsers}
            activeGroupReminders={this.props.activeGroupReminders}
          />
        </section>
      </div>
    );
  }
}

export default MainContent;
