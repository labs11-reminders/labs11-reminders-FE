import React, { Component } from 'react';
import MessageModal from '../MessageModal/MessageModal';
import UserGroupList from './UserGroupList';

class NewMessage extends Component {
    
    

    render() {
        return (
            <div className="NewMessage">
            
                <UserGroupList />
                <MessageModal buttonLabel="Compose New Message" />            
            </div>
        );
    }
}

export default NewMessage;