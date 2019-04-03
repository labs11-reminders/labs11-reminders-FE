import React, { Component } from 'react';
import axios from 'axios';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
    }

    handleChanges = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //webAddress = "https://reminders-international.herokuapp.com/api";
    //webAddress = "https://localhost:3000/api";

    searchUsers = () => {
        axios.post("https://localhost:3000/api/users/search", this.state.users)
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
        <InputGroup>
            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
            <Input 
                placeholder="search"
                onChange={this.handleChanges}
                search={this.searchUsers}
            />
            <Button color="success" onClick={this.addUserToGroup}>Add User</Button>
        </InputGroup>
        
        );
    }
}

export default SearchBar;