import React, { Component } from 'react';

import axios from 'axios';

import SearchBar from './SearchBar.js';
import PeopleTable from './PeopleTable.js';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          
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
  
    componentWillReceiveProps(){
      this.setState({
        group_id: this.props.activeGroup
      });
    }

    render() {
        console.log("**********")
        return (
            <div>
                <SearchBar  activeGroup={this.props.activeGroup}/>
                {this.state.group_id ? (
                <PeopleTable activeGroup={this.state.group_id}/>
                ) : ( <span>No people to display.</span>)}

            </div>
           
        );
    }
}

export default People;