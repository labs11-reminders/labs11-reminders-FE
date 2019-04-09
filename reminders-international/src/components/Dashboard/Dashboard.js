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
      user_id: null,
      groups: [],
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
    });     
  }

  getOrgGroups = () => {
    console.log('***********************');
    console.log('Calling for group list');
    console.log(this.state.profile);
    axios.get(`${process.env.REACT_APP_BACKEND}/api/orgs/${this.state.profile.org_id}/groups`)
      .then(res => {
       console.log('list of all groups', res);
      this.setState({
        groups: res.data
      });
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
        this.getOrgGroups();
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
            <Sidebar groups={this.state.groups} profile={this.state.profile} />
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
