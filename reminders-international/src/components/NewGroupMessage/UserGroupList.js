import React, { Component } from 'react';
import axios from 'axios';

import { Table, Col, FormGroup, Label, Input } from 'reactstrap';

class UserGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
    }

    getUsersByGroup = () => {
        //group id is hardcoded in - need to change it to pull id from props
        axios.get("http://localhost:3333/api/groups/2/users", this.state.users)
        //axios.get("https://reminders-international.herokuapp.com/api/groups/2/users", this.state.users)
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
          <Table borderless>
            <thead>
              <tr>
                <th>Remove from the message chain</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
                {this.state.users.map(user =>
                    <tr>
                    <th scope="row">
                        <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox2" />{'Do not send'}
            
                                </Label>
                            </FormGroup>
                        </Col>
                    </th>
                    <td>{user.name}</td>
                    </tr>
              )}
            </tbody>
          </Table>

        );
    }

}

export default UserGroupList;