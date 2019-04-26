import React, { Component } from 'react';
import axios from 'axios';
import SearchTable from './SearchTable';
import './People.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          query: '',
        };
    }

    handleChanges = () => {
        console.log('search change detected');
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            console.log('Are you searching');
            
            
            if (this.state.query.length % 2 === 0) {
              this.searchUsers();
            }
          } else {
            console.log('Not long enough');
            console.log(this.state.query);
            console.log(this.search.input);
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
          console.log("searchUsers res.data", res.data)
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
          this.props.getUsersByGroup_call();
        })
        .catch(err => {
            console.log(err);
        });
    }   


    render() {
        return (
     
        //can't be changed to a reactstrap styled component currently because it messes with the querying functionality  -Rachel
        <div>
        <div className="form-group w-50">
        <form className="searchBar">
          <input
            placeholder="Search for a user by name."
            ref={input => this.search = input}
            onChange={this.handleChanges}
            className="form-control form-control-sm"
          />
          
          
        </form></div>
        <>
        {this.state.query < 2 ? (
          null
        ) : (
          <SearchTable users={this.state.users} group_id={this.props.activeGroup} getUsersByGroup_call={this.props.getUsersByGroup_call}/>
        )}
        </>
        </div>
        );
    }
}

export default SearchBar;