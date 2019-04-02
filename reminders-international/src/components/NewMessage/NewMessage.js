import React, { Component } from 'react';
import MessageModal from '../MessageModal/MessageModal';

class NewMessage extends Component {
    

    render() {
        return (
            <div className="NewMessage">
                <MessageModal />            
            </div>
        );
    }
}

export default NewMessage;