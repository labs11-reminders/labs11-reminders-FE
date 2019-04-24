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
      activeGroupName: '',
      profile: {},
      users: [],
      activeGroupUsers: [],
      activeGroupReminders: [],
      org_id: null,
    };
    this.setActiveGroup = this.setActiveGroup.bind(this);
    this.setActiveGroupName = this.setActiveGroupName.bind(this);
  }

  setGroup(group_id) {
    console.log('setting group');
    this.setState({
      group_id: group_id,
    });
  }

  getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/users`, this.state.users)
      .then(res => {
        this.setState({
          users: res.data,
        });
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

  getRemindersByGroup = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/groups/reminders/${this.state.activeGroup}`)
      .then(res => {
        console.log('List of all reminders', res.data);
        this.setState({
          activeGroupReminders: res.data,
        });
      })
      .catch(err => {
        console.log({ errMessage: 'Getting reminders call error', err });
      });
  }

  componentWillMount() {
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
    this.getGroups();
  }

  setActiveGroup(id) {
    if (this.state.activeGroup !== id) {
      console.log('Setting ActiveGroup', id);
      // using callback to ensure that activeGroup is set before fetching users.
      this.setState({ activeGroup: id }, () => {
        console.log('ActiveGroup now', this.state.activeGroup);
        this.getUsersByGroup();
        this.getRemindersByGroup();
      });
    }
  }
  // Gets the name of the active group and sets state so name can be used in dashboard
  setActiveGroupName(groupName) {
    if (this.state.activeGroupName !== groupName) {
      console.log('***ID***', groupName);
      this.setState({ activeGroupName: groupName });
      console.log('ACTIVE', this.state.activeGroupName);
    }
  }

  getUsersByGroup = () => {
    console.log(
      'Dashboard fetching Users By Group',
      this.state.activeGroupUsers,
    );
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/api/groups/${
          this.state.activeGroup
        }/users`,
        this.state.activeGroupUsers,
      )
      .then(res => {
        console.log(res, res.data.rows);
        this.setState({
          // activeGroupUsers: res.data.rows,
          activeGroupUsers: res.data.rows,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
            
            <div className="mainContainer">
              {this.state.profile.name ? (
                <>
                  <section className="sidebar">
                    <Sidebar
                      setActiveGroup={this.setActiveGroup}
                      setActiveGroupName={this.setActiveGroupName}
                      getGroups={this.getGroups}
                      groups={this.state.groups}
                      profile={this.state.profile}
                      activeGroup={this.state.activeGroup}
                    />
                  </section>
                  <section className="content">
                    <MainContent
                      state={this.state}
                      getGroups={this.getGroups}
                      activeGroup={this.state.activeGroup}
                      groups={this.state.groups}
                      activeGroupUsers={this.state.activeGroupUsers}
                      activeGroupReminders={this.state.activeGroupReminders}
                      profile={this.state.profile}
                    />
                  </section>
                </>
              ) : (
                <span>Loading profile...</span>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default Dashboard;


//   getOrgsById(org_id){
//     if (!org_id) {org_id = this.state.org_id}
//     if (org_id) {
//       console.log("ORG_ID", org_id)
//     axios
//       .get(`${process.env.REACT_APP_BACKEND}/api/orgs/${org_id}`)
//       .then(res => {
//         this.setState({
//           org: { 
//             ...res.data,
//           },
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     }
//   };

//   getGroupsByOrg(org_id){
//     if (!org_id) {org_id = this.state.org_id}
//     if (org_id) {
//       console.log("ORG_ID FOR GROUPS", org_id)
//     }
//     axios
//       .get(`${process.env.REACT_APP_BACKEND}/api/orgs/${org_id}/groups`)
//       .then(res => {
//         console.log("RESSSSS Groups", res.data)
//         // const groupsInOrg = res.data.filter(group =>  group.org_id === this.props.org_id)
//         this.setState({
//           // groups: [...groupsInOrg]
//           groups: res.data,
//         });
//         console.log('Groups By Org', this.state.groups);
//       })
//       .catch(err => {
//         console.log(err);
//       });

//   };