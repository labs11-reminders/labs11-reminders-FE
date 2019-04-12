import React, { Component } from 'react';
import MessageModal from '../MessageModal/MessageModal';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import UserGroupList from './UserGroupList';

class NewGroupMessage extends Component {
    
    

    render() {
        console.log(this.props.state)
        return (
            <div className="NewMessage">
                {/* <MessageModal buttonLabel="Compose New Message" />  */}
                <MessageModalGroup groups = {this.props.groups} state ={this.props.state} buttonLabel="Compose Group Message" />  
                <UserGroupList activeGroupUsers={this.props.activeGroupUsers} activeGroup={this.props.activeGroup} />                         
            </div>
        );
    }
}

export default NewGroupMessage;