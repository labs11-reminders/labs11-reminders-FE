import React, { Component } from 'react';
import MessageModal from '../MessageModal/MessageModal';
import MessageModalGroup from '../MessageModal/MessageModalGroup';
import UserGroupList from './UserGroupList';

class NewGroupMessage extends Component {
    
    

    render() {
        return (
            <div className="NewMessage">
                {/* <MessageModal buttonLabel="Compose New Message" />  */}
                <MessageModalGroup buttonLabel="Compose Group Message" />  
                <UserGroupList />
                          
            </div>
        );
    }
}

export default NewGroupMessage;