import React, { Component } from 'react';

class MainContent extends Component {
  state = {};
  render() {
    return (
      <div className="mainContentWrapper">
        <section className="profileInfo">Profile Info</section>
        <section className="messageSection">Content</section>
      </div>
    );
  }
}

export default MainContent;
