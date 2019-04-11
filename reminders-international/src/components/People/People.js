import React, { Component } from 'react';

import axios from 'axios';

import SearchBar from './SearchBar.js';
import PeopleTable from './PeopleTable.js';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
    }


    getUserInfo = () => {
        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
          if (profile) {
            axios.post(`${process.env.REACT_APP_BACKEND}/api/users/auth`, {auth0_sub: profile.sub})
              .then(res => {
                return axios.get(`${process.env.REACT_APP_BACKEND}/api/users/data/${this.user.id}`, this.user.auth0_sub)
              })
              .then(res => {
                this.setState({
                  user: res.data
                });
              })
              .catch(err => {
                console.log(err);
              })     
          }
        });   
      }
  
      getUsersByGroup = () => {
        console.log("People --  getUsersByGroup this.state", this.props.activeGroup)
        console.log("this.state.group", this.props.activeGroup)
        // if (!this.state.group.id) {
        //   this.state.group.id = 2;
        // }
          //group id is hardcoded in - need to change it to pull id from props
          console.log('getting users by group');
          axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/${this.props.activeGroup}/users`, this.state.users)
            .then(res => { 
              console.log(res, res.data) 
              this.setState({
                  users: res.data
              });
          })
          .catch(err => {
              console.log(err);
          });
      }
  
      componentWillReceiveProps() {
          console.log('People table mounted');
          this.getUsersByGroup();
      }


    render() {
        console.log("**********")
        return (
            <div>
                <SearchBar activeGroup={this.props.activeGroup} />
                {this.state.users.length > 0 ? (
                <PeopleTable activeGroup={this.props.activeGroup}/>
                ) : ( <span>No people to display.</span>)}

            </div>
           
        );
    }
}

export default People;