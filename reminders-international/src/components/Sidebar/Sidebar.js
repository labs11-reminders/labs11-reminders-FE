import React, { Component } from 'react';
import { NavLink } from 'reactstrap';

class Sidebar extends Component {
  state = {};

  render() {
    return (
      <div className="sidebarWrapper">
        <section className="profileSection cube">
          <div id="profilePicture">JW</div>
          <div id="profileName">
            <span>Hello, User</span>
          </div>
        </section>
        <section className="orgSection cube">
          <h6>ORGANIZATION</h6>
          <div>Organization Name</div>
        </section>
        <section className="groupsSection cube">
          <h6>GROUPS</h6>
          <NavLink id="createLink" onClick={null}>
            Create Group
          </NavLink>
          <div>Group Name List</div>
        </section>
        <section className="convSection cube">
          <h6>CONVERSATIONS</h6>
          <div>User Name</div>
          <div>User Name</div>
          <div>User Name</div>
        </section>
      </div>
    );
  }
}

export default Sidebar;
