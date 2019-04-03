import React, { Component } from 'react';
import axios from 'axios';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import SearchTable from './SearchTable';

class SearchBar extends Component {
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

    //webAddress = "https://reminders-international.herokuapp.com/api";
    //webAddress = "https://localhost:3000/api";
   

    searchUsers = () => {
        console.log('search....');
        axios.interceptors.request.use(request => {
            console.log('Starting Request', request)
            return request
            });
        axios.post("http://localhost:3333/api/users/search", {search: this.state.query})
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
        axios.post("https://localhost:3000/api/add/user", this.state.users)
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
     

        <form>
        <input
          placeholder="Search for user..."
          ref={input => this.search = input}
          onChange={this.handleChanges}
        />
        
        <SearchTable users={this.state.users} />
        </form>
        
        );
    }
}

export default SearchBar;