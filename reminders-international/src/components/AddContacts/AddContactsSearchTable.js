import React, { Component } from 'react';
import RowElement from './RowElement.js'
import { Table } from 'reactstrap';

class SearchTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: {
                id: 2,
            }
          };
    }

    emptyTable = () => {
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
                this.emptyTable() && (
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
                    <RowElement key={user.id} value={user.id} user={user} group={this.state.group} show_add={true} />
                )}
            </tbody>
            </Table>
                )}
                </div>
        )
    }
}

export default SearchTable;