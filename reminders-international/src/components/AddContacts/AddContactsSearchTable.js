import React, { Component } from 'react';
import SearchElement from './SearchElement.js';
import { Table } from 'reactstrap';

class AddContactSearchTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
          };
    }

    searchTable = () => {
        if (this.props.users.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    
    render() {
        return (
            <div>
            {
                this.searchTable() && (
            <Table>
                
                
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Country</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Add to Group</th>
              </tr>
            </thead>
        
            <tbody>
                
                {this.props.users.map(user => 
                    <SearchElement key={user.id} value={user.id} user={user} activeGroup={this.props.activeGroup} show_add={true} />
                )}
            </tbody>
            </Table>
                )}
                </div>
        )
    }
}

export default AddContactSearchTable;