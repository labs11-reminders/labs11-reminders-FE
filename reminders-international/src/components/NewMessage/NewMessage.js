import React, { Component } from 'react';
import MessageModal from '../MessageModal/MessageModal';

class NewMessage extends Component {
    

    render() {
        return (
            <div className="NewMessage">
            <p>Create new message:</p>
                <MessageModal buttonLabel="Click Me!" />            
            </div>
        );
    }
}

export default NewMessage;