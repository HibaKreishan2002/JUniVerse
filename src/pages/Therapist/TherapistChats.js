import React, { useEffect, useState, useRef } from "react";
import styles from "./TherapistChatsStyle.js";
import { Typography, Badge } from "@mui/material";
import JuUniVerseAxios from "../../API/JuUniVerseAxios.js";

function TherapistChats() {
  const [dataStudent, setDataStudent] = useState([]);
  const [message, setMessage] = useState("");
  const [chatID, setChatID] = useState(null);
  const [data, setData] = useState([]);
  const [receiverUsername, setReceiverUsername] = useState("");
  const [receiverFullName, setReceiverFullName] = useState("");
  const chatContainerRef = useRef(null);
  const [selectedUserId, setSelectedUserId] = useState(null);


  useEffect(() => {
    const getAllChats = async () => {
      try {
        const res = await JuUniVerseAxios.get("/private-chat/allTherapistChats");
        setDataStudent(res?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    getAllChats();
    const interval = setInterval(getAllChats, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!chatID) return;
    const getMessages = async () => {
      try {
        const res = await JuUniVerseAxios.get(`/private-chat/${chatID}/allMessages`);
        setData(res?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    getMessages();
    const interval = setInterval(getMessages, 3000);
    return () => clearInterval(interval);
  }, [chatID]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      await JuUniVerseAxios.post("/private-chat/messageFromTherapist", {
        privateChatId: chatID,
        receiverUsername,
        content: message,
      });
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div style={styles.chatPage}>
      <div style={styles.leftPanel}>
        <h2 style={styles.leftPanelHeader}>Messages</h2>
        <ul style={styles.userList}>
          {dataStudent.map((user) => (
            <li
              key={user.id}
              
              onClick={() => {
                setChatID(user.id);
                setReceiverUsername(user.userUsername);
                setReceiverFullName(user.userFirstName+" "+ user.userLastName)
                setSelectedUserId(user.id);  // Set the clicked user as selected

              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9e9e9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              style={{
                ...styles.userListItem,
                border: user.id === selectedUserId ? '3px solid black' : '1px solid #ddd', // Conditionally change border
                fontWeight: user.id === selectedUserId ? 'bold' : 'normal', // Bold the selected item
              }}            >
              <Badge badgeContent={user.therapistUnreadMessagesCount} color="error">
                <span style={{ padding: 7 }}>{user.userFirstName} {user.userLastName}</span>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.rightPanel}>
        <Typography sx={{ fontWeight: "bold", color: "black", marginTop: 3 }}>{receiverFullName}</Typography>
        <hr />
        <div style={{ ...styles.chatArea, flexGrow: 1 }} ref={chatContainerRef}>
          {data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((msg) => (
            <p
              key={msg.id}
              style={msg.receiverUsername === receiverUsername ? styles.receivedMessage : styles.sentMessage}
            >
              {msg.content}
              <br />
              <sub style={styles.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
            </p>
          ))}
        </div>

        <div style={{ ...styles.messageInput, position: 'sticky', bottom: 0, backgroundColor: '#fff', zIndex: 1 }}>
          <input
            type="text"
            value={message}
            placeholder="Write a message..."
            onChange={(e) => setMessage(e.target.value)}
            style={styles.messageInputField}
            
          />
          <button style={styles.messageInputButton} onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default TherapistChats;
