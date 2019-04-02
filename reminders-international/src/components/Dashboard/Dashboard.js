import React, { Component } from 'react';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from './MainContent';

class Dashboard extends Component {
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
