import React, { Component } from 'react';

import axios from 'axios';

import SearchBar from './SearchBar.js';
import PeopleTable from './PeopleTable.js';
import './People.css';

class People extends Component {
  constructor(props) {
      super(props);
      this.state = {
        users: [],
        group_id: null,
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
        console.log("Render People this.state", this.state)
        console.log("Render People this.props", this.props)
        return (
            <div>
                
                <hr></hr>
                <h5 className="peopleSearchHeader">Search for a user to add them to your selected group above.</h5>
                <SearchBar  activeGroup={this.props.activeGroup}/>
                <hr></hr>
                <hr></hr>
                <h4 className="peopleHeader">Users currently in your group</h4>
                {this.state.group_id ? 
                  (
                  <PeopleTable 
                  activeGroup={this.state.group_id} 
                  activeGroupUsers={this.props.activeGroupUsers}
                  />
                  ) : 
                  ( <p className="peopleParagraph">Please choose a group on the sidebar to display the members of the group.</p>)}

            </div>
           
        );
    }
}

export default People;