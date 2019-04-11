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
                <MessageModalGroup state ={this.props.state} buttonLabel="Compose Group Message" />  
                <UserGroupList />
                          
            </div>
        );
    }
}

export default NewGroupMessage;