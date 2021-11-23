import React from 'react'
import '../../CSS/Messenger.css'
import { format } from "timeago.js";

export default function Message({ message, own }) {

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <p className="messageText">                   
                    {message.messageText}
                </p>
            </div>
            <div className="messageBottom">
            {format(message.createdAt)}
            </div>
        </div>
    );
}