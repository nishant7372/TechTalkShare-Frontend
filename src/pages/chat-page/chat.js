import styles from "./chat.module.css";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";

import { useGetMessages } from "../../hooks/messages/useGetMessages";
import { setError } from "../../features/alertSlice";

import ChatBox from "./chatBox";

import Users from "./users";

export default function Chat() {
  const { user: me } = useSelector((store) => store.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [reciever, setReciever] = useState(null);

  const { getMessages, isPending: messagesLoading } = useGetMessages();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const handleSetReciever = (user) => {
    setReciever(user);
  };

  const sendMessage = (message) => {
    const newMessage = {
      sender: me._id,
      content: message,
      reciever: reciever._id,
      createdAt: new Date().toISOString(),
    };
    socket.emit("new_message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await getMessages(reciever.userName);
      if (res.ok) {
        setMessages(res.data);
      } else if (res.error) {
        dispatch(setError(res.error.message));
      }
    };
    if (reciever) fetchMessages();
  }, [reciever]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_DEV_SERVER_URL);
    socket.emit("connected", {
      message: "Chat Connection Established",
      userId: me._id,
    });
    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });
    socket.on("new_message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
    setSocket(socket);

    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <div className={styles["chat-page"]}>
      <Users reciever={reciever} onlineUsers={onlineUsers} />
      <Routes>
        <Route
          path="/:userName"
          element={
            !me ? (
              <Navigate to="/login" />
            ) : (
              <ChatBox
                onlineUsers={onlineUsers}
                sendMessage={sendMessage}
                messages={messages}
                messagesLoading={messagesLoading}
                handleSetReciever={handleSetReciever}
              />
            )
          }
        />
        <Route
          path="/"
          element={
            !me ? (
              <Navigate to="/login" />
            ) : (
              <div className={styles["chatbox"]}>
                <div className={styles["noUserSelected"]}>
                  <img
                    src={process.env.PUBLIC_URL + "/img/chat.png"}
                    alt="chat"
                  />
                  <div>Select a chat to start messaging</div>
                </div>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
}
