import React, { Component } from 'react';
import axios from 'axios';

import { Table, Col, FormGroup, Label, Input } from 'reactstrap';

class UserGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],

        };
    }

    render() {
      console.log('++++++++++++++++++++ USER GROUP LIST ++++++++++++++++',this.state);
        return (
          
          <Table borderless>
            <thead>
              <tr>
                <th>Remove from the message chain</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
                {this.props.activeGroupUsers.map(user =>
                    <tr>
                    <td scope="row">
                        <Col sm={{ size: 10 }}>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="checkbox2" />{'Do not send'}
            
                                </Label>
                            </FormGroup>
                        </Col>
                    </td>
                    <td>{user.name}</td>
                    </tr>
              )}
            </tbody>
          </Table>

        );
    }

}

export default UserGroupList;