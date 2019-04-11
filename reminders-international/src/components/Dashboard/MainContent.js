import React, { Component } from 'react';
import { Button } from 'reactstrap';
import TabsSection from './Tabs';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  editUser() {
    console.log('Edit User Clicked');
  }

  editGroup() {
    console.log('Edit Group Clicked');
  }

  editOrg() {
    console.log('Edit Org Clicked');
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
            </Button>{' '}
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
                <DropdownItem onClick={this.editUser} id="drpItem">
                  Edit User
                </DropdownItem>

                <DropdownItem onClick={this.editGroup} id="drpItem">
                  Edit Group
                </DropdownItem>

                <DropdownItem onClick={this.editOrg} id="drpItem">
                  Edit Organization
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
