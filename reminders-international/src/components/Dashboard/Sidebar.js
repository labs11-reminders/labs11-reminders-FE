import React, { Component } from 'react';

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <div className="sidebarWrapper">
        <section className="profileSect">Profile</section>
        <section className="groupOwnedSect">Groups Owned</section>
        <section className="groupJoinedSect">Groups Joined</section>
        <section className="convSect">Conversations</section>
      </div>
    );
  }
}

export default Sidebar;
