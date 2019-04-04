import React, { Component } from 'react';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from './MainContent';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role_id: null,
      org_id: null,
      group_id: null,
    };
  }

  // componentWillMount() {
  //   this.setState({ profile: {} });
  //   const { userProfile, getProfile } = this.props.auth;
  //   if (!userProfile) {
  //     getProfile((err, profile) => {
  //       this.setState({ profile });
  //     });
  //   } else {
  //     this.setState({ profile: userProfile });
  //   }
  // }

  render() {
    return (
      <>
        <h1>Dashboard</h1>
        <div className="mainContainer">
          <section className="sidebar">
            <Sidebar />
          </section>
          <section className="content">
            <MainContent />
          </section>
        </div>
      </>
    );
  }
}

export default Dashboard;
