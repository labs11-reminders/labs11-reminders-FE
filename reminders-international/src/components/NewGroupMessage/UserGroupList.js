import React, { Component } from 'react';

import { Table, Col, FormGroup, Label, Input } from 'reactstrap';

class UserGroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],

        };
    }
//   Line 28:  The scope prop can only be used on <th> elements  jsx-a11y/scope
    render() {
      console.log('UserGroupList Render',this.state);
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