import React, { Component } from 'react';
import axios from 'axios';
import { InputGroup, InputGroupAddon, Input, Button, FormGroup} from 'reactstrap';
import SearchTable from './AddContactsSearchTable';

class AddContactSearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          query: ''
        };
    }

    handleChanges = () => {
        console.log('search change detected');
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.searchUsers()
            }
          } 
        })
      }

    searchUsers = () => {
        console.log('search....');
        axios.interceptors.request.use(request => {
            console.log('Starting Request', request)
            return request
            });
        axios.post(`${process.env.REACT_APP_BACKEND}/api/users/search`, {search: this.state.query})
        .then(res => {
            this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    addUserToGroup = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/api/add/user`, this.state.users)
        .then(res => {
            this.setState({
                users: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }   


    render() {
        return (
     

        <FormGroup>
          <Input
            placeholder="Search for user..."
            ref={input => this.search = input}
            onChange={this.handleChanges}
          />
          
          <SearchTable users={this.state.users} />
        </FormGroup>
        
        );
    }
}

export default AddContactSearchBar;