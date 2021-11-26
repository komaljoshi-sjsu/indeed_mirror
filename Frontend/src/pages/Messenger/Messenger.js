import React, { useEffect, useState, useRef } from "react";
import "../../CSS/Messenger.css";
import Conversation from "./Conversation";
import NewConversation from "./NewConversation";
import Message from "./Message";
import axios from "axios";
import Select from "react-select";
import { useSelector } from "react-redux";
import JobSeekerLoggedInNavbar from '../JobSeeker/JobSeekerLoggedInNavbar'
import EmployerNavbar from '../Employer/EmployerNavbar'

const Messenger = (props) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const id = useSelector((state) => state.userInfo.id);
  const accountType = useSelector((state) => state.userInfo.accountType);
  const [userId, setUserId] = useState(parseInt(id)); // add id from store
  const [newMessage, setNewMessage] = useState("");
  const [jobSeekers, setJobSeekers] = useState([]);
  const [isEmployer, setIsEmployer] = useState(false);
  const [newConversation, setNewConversation] = useState();
  const [role, setRole] = useState(accountType); // add role from store
  const scrollRef = useRef();

  //past conv
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/getAllJobSeekers");
        const convResponse = await axios.get(
          "/api/getConversationById/" + userId
        );
        let removeArr = [];
        convResponse.data.map((item) => {
          removeArr.push(item.members[1]);
        });

        const myArray = res.data.filter((el) => !removeArr.includes(el.value));
        console.log("filtered" + JSON.stringify(convResponse.data));
        setConversations(convResponse.data);
        setJobSeekers(myArray);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  //get all messages of selected chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/getMessages/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  //handle send for existing and new conversations
  const handleSend = async (e) => {
    e.preventDefault();
    if (messages.length > 0) {
      try {
        const message = {
          conversationId: currentChat._id,
          sender: userId,
          messageText: newMessage,
        };
        const res = await axios.post("/api/addNewMessage", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const conversation = {
          senderId: userId,
          receiverId: newConversation.value,
        };
        const res = await axios.post("/api/saveConversation", conversation);
        const message = {
          conversationId: res.data._id,
          sender: userId,
          messageText: newMessage,
        };
        const response = await axios.post("/api/addNewMessage", message);
        setMessages([...messages, response.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {("JobSeeker" === role) ? (
        <JobSeekerLoggedInNavbar />
      ) : (
        <EmployerNavbar />
      )}

      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {isEmployer && (
              <Select
                options={jobSeekers}
                isSearchable={true}
                isClearable={true}
                placeholder="Search for jobseekers"
                onChange={setNewConversation}
              />
            )}
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation
                  conversation={c}
                  currentUser={userId}
                  role={role}
                />
              </div>
            ))}
            <div onClick={() => setCurrentChat(1)}>
              <NewConversation conversation={newConversation} />
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <div>
                <div className="chatBoxTop">
                  {messages.map((msg) => (
                    <div ref={scrollRef}>
                      <Message
                        message={msg}
                        own={Number(msg.sender) === userId}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSend}>
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <span className="noConversationMsg">No conversations yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Messenger;
