import React, { useEffect, useState } from 'react'
import '../../CSS/Conversation.css'
import axios from "axios";

export default function Conversation({conversation, currentUser, role}) {

    const [jobSeeker, setJobSeeker ] = useState();

    useEffect(() => {
        console.log(role);
        const receiverId = conversation.members.find((conv) => conv !== currentUser);
        console.log("receiverId" +receiverId);
        const getJobSeeker = async () => {
            try {
                const response = await axios.get("/api/getJobSeekerById/" +receiverId);               
                setJobSeeker(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        const getEmployer = async () => {
            try {
                const response = await axios.get("/api/getEmployerById/" +receiverId);               
                setJobSeeker(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        if("Employer" === role) {
            getJobSeeker();
        } else {
            getEmployer();
        }      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, conversation]);

    return(        
        <div className="conversation">
            {jobSeeker?.name && <span className="conversationName">{jobSeeker?.name}</span>}
        </div>
    );
}