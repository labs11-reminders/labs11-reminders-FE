import React, { Component } from 'react';
import axios from 'axios';
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
      user_id: null,
    };
  }

  getUsers = () => {
    axios.get("https://reminders-international.herokuapp.com/api/users", this.state.users)
      .then(res => {
      //  console.log('list of 500 users', res.data);
        this.setState({
        users: res.data
        });
        //  console.log('getUsers this.state.users', this.state.users);
    })
    .catch(err => {
        console.log(err);
    });
  }

  

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    console.log("Dashboard Render this", this.state)
    return (
      <>

        <h1> {this.state.profile.given_name}'s Dashboard </h1>
        <div className="mainContainer">
          <section className="sidebar">
            <Sidebar profile={this.state.profile} />
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
