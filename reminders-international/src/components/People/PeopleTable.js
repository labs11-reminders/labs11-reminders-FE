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
        //group id is hardcoded in - need to change it to pull id from props
        console.log('getting users by group');
        axios.get(`${process.env.REACT_APP_BACKEND}/api/groups/${this.state.group.id}/users`, this.state.users)
          .then(res => {  
            this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
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
                   <RowElement key={user.id} value={user.id} user={user} group={this.state.group} show_delete={true} /> 
                )}
            </tbody>
            </Table>
            
        )
    }
}

export default PeopleTable;