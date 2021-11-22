import React, { useEffect, useState } from 'react'
import '../../CSS/Messenger.css'
import Conversation from './Conversation'
import Message from './Message'
import axios from "axios";

const Messenger = (props) => {

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const userId = 1;
                const res = await axios.get("/api/getConversationById/" + userId);
                setConversations(res.data);
            } catch (err) {
                console.log(err)
            }
        };
        getConversations();
    }, [])

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for jobseekers" className="chatMenuInput" />
                    <Conversation />
                    <Conversation />
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />

                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="write something..."></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Messenger;