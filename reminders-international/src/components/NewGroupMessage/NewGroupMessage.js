import React, { Component } from 'react';
import MessageModal from '../MessageModal/MessageModal';
import UserGroupList from './UserGroupList';

class NewGroupMessage extends Component {
    
    

    render() {
        return (
            <div className="NewMessage">
                <MessageModal buttonLabel="Compose New Message" />  
                <UserGroupList />
                          
            </div>
        );
    }
}

export default NewGroupMessage;