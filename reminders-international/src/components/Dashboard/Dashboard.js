import React, { Component } from 'react';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from './MainContent';
import axios from 'axios';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      activeGroup: null,
      profile: {},
      users: [],
    };
    this.setActiveGroup = this.setActiveGroup.bind(this);
  }

  getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/users`, this.state.users)
      .then(res => {
        //  console.log('list of 500 users', res.data);
        this.setState({
          users: res.data,
        });
        //  console.log('getUsers this.state.users', this.state.users);
      });
  };

  getGroups = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/groups`)
      .then(res => {
        console.log('List of all groups', res.data);
        this.setState({
          groups: res.data,
        });
      })
      .catch(err => {
        console.log({ errMessage: 'Groups api call error', err });
      });
  };

  // getOrgGroups = () => {
  //   console.log('***********************');
  //   console.log('Calling for group list');
  //   console.log(this.state.profile);
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_BACKEND}/api/orgs/${
  //         this.state.profile.org_id
  //       }/groups`,
  //     )
  //     .then(res => {
  //       console.log('list of all groups', res);
  //       this.setState({
  //         groups: res.data,
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

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
    this.getGroups();
  }

  setActiveGroup(id) {
    if (this.state.activeGroup !== id) {
      console.log('***ID***', id);
      this.setState({ activeGroup: id });
      console.log('ACTIVE', this.state.activeGroup);
    }
  }

  render() {
    console.log('Dashboard Render this', this.state, this.props);
    return (
      <>
        {/* This needs to remain {this.state.profile.nickname} in order to render correctly -Rachel */}

        {/* This checks to see if the auth0 profile is undefined 
        (which occurs when user token is expired) and then instead of an error message 
        the h5 is displayed and local storage is cleared so the nav changes to 'logout'. */}
        {this.state.profile === undefined ? (
          <div>
            {this.props.auth.logout()}
            <h5>Error displaying Page. Please Login!</h5>
          </div>
        ) : (
          <>
            <h1> {this.state.profile.nickname}'s Dashboard </h1>
            <div className="mainContainer">
              <section className="sidebar">
                <Sidebar
                  setActiveGroup={this.setActiveGroup}
                  groups={this.state.groups}
                  profile={this.state.profile}
                />
              </section>
              <section className="content">
                <MainContent state={this.state} />
              </section>
            </div>
          </>
        )}
      </>
    );
  }
}

export default Dashboard;
