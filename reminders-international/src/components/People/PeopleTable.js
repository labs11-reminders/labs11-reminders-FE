import React, { Component } from 'react';
import axios from 'axios';

import { Table } from 'reactstrap';
import RowElement from './RowElement.js';

class PeopleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          group: {
            id: "",
          },
          user: {
            auth0_sub: "",
          }
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
      console.log("PeopleTable getUsersByGroup this.state", this.props.activeGroup)
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

    componentDidMount() {
      console.log('People table mounted');
      this.getUsersByGroup();
    }

    render() {
        
        return (
            <Table>
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Country</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

                {this.state.users.map(user => 
                   <RowElement key={user.id} value={user.id} user={user} group_id={this.props.activeGroup} show_delete={true} /> 
                )}
                
            </tbody>
            </Table>
            
        )
    }
}

export default PeopleTable;