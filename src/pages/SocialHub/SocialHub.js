import React, { useEffect, useState, useRef } from 'react';
import Header from "../../components/Header.js";
import JuUniVerseAxios from '../../API/JuUniVerseAxios';
import { Typography, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import SocialHubStyle from "./SocialHubStyle.js";
import ResponsiveDev from "../../components/ResponsiveDev.js";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import MoreVertIcon from "@mui/icons-material/MoreVert";

function SocialHub() {
  const [message, setMessage] = useState("");
  const [refershPage, setRefershPage] = useState(0);
  const [data, setData] = useState([]);
  const [messageInfo, setMessageInfo] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const chatContainerRef = useRef(null);

  const handleMenuClick = (event, msg) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedMsg(msg);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedMsg(null);
  };

  const handleSendMessage = () => {
    if (messageInfo) {
      JuUniVerseAxios.put(`/public-chat/${messageInfo.id}`, { content: messageInfo.content })
        .then(() => {
          setMessageInfo(null);
          setRefershPage(refershPage + 1);
        })
        .catch(console.log);
    } else {
      JuUniVerseAxios.post("/public-chat/message", { content: message })
        .then(() => {
          setMessage("");
          setRefershPage(refershPage + 1);
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [data.length]);

  const handleDeleteMessage = (id) => {
    JuUniVerseAxios.delete(`/public-chat/${id}`).then(() => {
      setRefershPage(refershPage + 1);
    }).catch(console.log);
  };

  useEffect(() => {
    const getAllMessages = () => {
      JuUniVerseAxios.get(`/public-chat/messages`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch(console.log);
    };
    const interval = setInterval(getAllMessages, 1000);
    return () => clearInterval(interval);
  }, [refershPage]);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  }
    // Function to generate a unique color based on username
    const getUsernameColor = (username) => {
      let colorKey = 0;
      for (let i = 0; i < username.length; i++) {
        colorKey = username.charCodeAt(i) + ((colorKey << 5) - colorKey);
      }
      const color = `hsl(${colorKey % 360}, 70%, 50%)`; // Generates a unique HSL color
      return color;
    };

  return (
    <ResponsiveDev>
      <div style={SocialHubStyle.chatPage}>
        <div style={SocialHubStyle.rightPanel}>
          <Typography sx={{ fontWeight: "bold", color: "Black" }}>Chat</Typography>
          <div style={{ ...SocialHubStyle.chatArea, flexGrow: 1 }} ref={chatContainerRef}>
            {data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((msg) => (
              msg.status === "SENT" ? (
                <div key={msg.id} style={sessionStorage.getItem("username") === msg.senderUsername ? SocialHubStyle.receivedMessage : SocialHubStyle.sentMessage}>
                  <h4 style={{ ...SocialHubStyle.senderUsername }}>
                  <sup style={{color:getUsernameColor(msg.senderUsername)}}>                      
                      {msg.senderUsername}  ({msg.senderRole})</sup>
                  </h4>
                  {(sessionStorage.getItem("username") === msg.senderUsername || sessionStorage.getItem("role") === "ADMIN" || sessionStorage.getItem("role") === "MODERATOR") && (
                ((msg.senderRole!="ADMIN"||(msg.senderUsername==sessionStorage.getItem("username")))&& (msg.senderRole!="MODERATOR"||(msg.senderUsername==sessionStorage.getItem("username"))))?
                <IconButton onClick={(e) => handleMenuClick(e, msg)} sx={{ float: "right" }}>
                      <MoreVertIcon />
                    </IconButton>:""
                  )}
                  <p style={SocialHubStyle.content}>{msg.content}</p>
                  <sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
                </div>
              ) : null
            ))}
          </div>
          
          <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
            {selectedMsg && sessionStorage.getItem("username") === selectedMsg.senderUsername && (
              <MenuItem onClick={() => {
                setMessageInfo({ id: selectedMsg.id, content: selectedMsg.content });
                handleMenuClose();
              }}>Edit</MenuItem>
            )}
            {console.log(selectedMsg)
            }
            {selectedMsg && ( sessionStorage.getItem("role") === "ADMIN" || sessionStorage.getItem("role") === "MODERATOR") && (

<MenuItem onClick={() => {
                handleDeleteMessage(selectedMsg.id);
                handleMenuClose();
              }}>Delete</MenuItem>
          
            )}
          </Menu>
          <div style={SocialHubStyle.messageInput}>
            <input
              type="text"
              value={messageInfo ? messageInfo.content : message}
              placeholder="Write a message"
              onChange={(e) => messageInfo ? setMessageInfo({ ...messageInfo, content: e.target.value }) : setMessage(e.target.value)}
              style={SocialHubStyle.messageInputField}
            />
            {messageInfo && (
              <button onClick={() => setMessageInfo(null)} style={{ background: "transparent", border: "none", cursor: "pointer", marginRight: "10px" }}>
                <ClearIcon />
              </button>
            )}
            <button style={SocialHubStyle.messageInputButton} onClick={handleSendMessage}>{messageInfo ? "Update" : "Send"}</button>
          </div>
        </div>
      </div>
    </ResponsiveDev>
  );
}

export default SocialHub;
