import { useState, useEffect, useRef, useContext } from "react";
import axios from "../../api/axios";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import NavBar from "../../components/navbar/NavBar";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";
import styles from "./messenger.module.css";
import ChatOnline from "../../components/chatOnline/ChatOnline";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const socket = useRef();
  const scrollRef = useRef();
  const SOCKET_URI = process.env.REACT_APP_SOCKET_URI;

  useEffect(() => {
    socket.current = io(SOCKET_URI);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [SOCKET_URI]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
      setOnlineUsers(
        user.followings.filter((friend) =>
          users.some((u) => u.userId === friend)
        )
      );
    });
  }, [user]);
  console.log(onlineUsers);
  useEffect(() => {
    const getConversations = async () => {
      console.log(user._id);

      try {
        const res = await axios.get(`/conversations/${user._id}`);
        setConversations(res.data.conversation);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get(`/messages/${currentChat?._id}`);
          setMessages(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    console.log(currentChat.members);

    const recieverId = currentChat.members.find(
      (member) => member !== user._id
    );
    console.log(recieverId);
    console.log(user._id);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      recieverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <div className={styles.messenger}>
        <div className={styles.chatMenu}>
          <div className={styles.chatMenuWrapper}>
            <input
              className={styles.chatMenuInput}
              placeholder="search for friends"
            />
            {conversations.map((conversation, i) => (
              <div
                key={`conversation_${i}_${conversation._id}`}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chatBox}>
          <div className={styles.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={styles.chatBoxTop}>
                  {messages.map((msg, i) => (
                    <div key={`message_${i}_${msg._id}`} ref={scrollRef}>
                      <Message message={msg} own={msg.sender === user._id} />
                    </div>
                  ))}
                </div>
                <form className={styles.chatForm} onSubmit={submitHandler}>
                  <textarea
                    className={styles.chatMessageInput}
                    placeholder={"Write Message"}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button className={styles.submitButton}>Send</button>
                </form>
              </>
            ) : (
              <span className={styles.noConversation}>
                Open a conversation to start chat
              </span>
            )}
          </div>
        </div>
        <div className={styles.onlineChat}>
          <div className={styles.onlineChatWrapper}>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Messenger;
