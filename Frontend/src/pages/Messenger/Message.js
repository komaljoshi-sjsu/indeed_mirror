import React, { useEffect } from 'react'
import '../../CSS/Messenger.css'
import Conversation from './Conversation'

const Message = ({own}) => {

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <p className="messageText">This is a message very long just to text jaghjffa,fniklgh juofuoefg ieug9wg kiugou9weg iuef9pwug iyhwfgiwye</p>
            </div>
            <div className="messageBottom">
                1 hr ago
            </div>
        </div>
    );
}

export default Message;