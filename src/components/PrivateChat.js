import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from '@mui/icons-material/Clear';
import SocialHubStyle from '../pages/SocialHub/SocialHubStyle';
import JuUniVerseAxios from '../API/JuUniVerseAxios';

function PrivateChat() {
  const chatRef = useRef(null);

  const [isChatVisible, setIsChatVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [refreshPage, setRefreshPage] = useState(0);
  const [scrollPage, setScrollPage] = useState(0);
  const [data, setData] = useState([]);
  const [messageInfo, setMessageInfo] = useState(null);
  const [menuData, setMenuData] = useState({ anchorEl: null, selectedMsg: null });

  const handleChatToggle = () => {
    setIsChatVisible(!isChatVisible);
    setScrollPage(scrollPage + 1);
  };

  const handleClose = () => {
    setMenuData({ anchorEl: null, selectedMsg: null });
  };

  const handleClick = (event, msg) => {
    setMenuData({ anchorEl: event.currentTarget, selectedMsg: msg });
  };

  const handleSendMessage = () => {
    if (messageInfo) {
      JuUniVerseAxios.put(`/private-chat/${messageInfo.id}`, { content: messageInfo.content })
        .then(() => {
          setMessageInfo(null);
          setRefreshPage(refreshPage + 1);
        })
        .catch((error) => console.log(error));
    } else {
      JuUniVerseAxios.post("/private-chat/messageToTherapist", { content: message })
        .then(() => {
          setMessage("");
          setRefreshPage(refreshPage + 1);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    const getAllMessages = () => {
      JuUniVerseAxios.get(`/private-chat/allMessages`)
        .then(res => setData(res.data.data))
        .catch(error => console.log(error));
    };

    const interval = setInterval(getAllMessages, 1000);
    return () => clearInterval(interval);
  }, [refreshPage]);

  useEffect(() => {
    const chatBox = document.getElementById("chatContainer");
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [scrollPage, data.length]);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  }

  return (
    <>
      {/* Chat Box - Appears above the chat button when opened */}
      {isChatVisible && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '10px', // Position above the button
            right: '20px',
            backgroundColor: '#fff',
            width: 400,
            height: 500,
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 1001,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: '#d32f2f',
            }}
            onClick={handleChatToggle}
          >
            X
          </IconButton>

          <Typography sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            Chat
          </Typography>

          <Box id="chatContainer" sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
            <div style={SocialHubStyle.chatArea}>
              {data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((msg) =>
                msg.senderUsername !== "omar_khaled" ? (
                  <div key={msg.id} style={{ position: "relative" }}>
                    <IconButton onClick={(e) => handleClick(e, msg)} sx={{ float: "right" }}>
                      <MoreVertIcon />
                    </IconButton>
                    <p index={msg.id} style={SocialHubStyle.receivedMessage}>
                      {msg.content}
                      <br />
                      <sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
                    </p>
                  </div>
                ) : (
                  <p key={msg.id} style={SocialHubStyle.sentMessage}>
                    {msg.content}
                    <br />
                    <sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
                  </p>
                )
              )}
            </div>
          </Box>

          {/* Single Menu Component Outside the Map Function */}
          <Menu
            anchorEl={menuData.anchorEl}
            open={Boolean(menuData.anchorEl)}
            onClose={handleClose}
            elevation={8}
            sx={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
            }}
          >
            <MenuItem
              onClick={() => {
                setMessageInfo({
                  id: menuData.selectedMsg?.id,
                  content: menuData.selectedMsg?.content
                });
                setMenuData({ anchorEl: null, selectedMsg: null });
              }}
            >
              Edit
            </MenuItem>
          </Menu>

          <div style={SocialHubStyle.messageInput}>
            <input
              type="text"
              value={messageInfo ? messageInfo.content : message}
              placeholder="Write a message"
              onChange={(e) =>
                messageInfo
                  ? setMessageInfo({ ...messageInfo, content: e.target.value })
                  : setMessage(e.target.value)
              }
              style={SocialHubStyle.messageInputField}
            />
            {messageInfo && (
              <button
                onClick={() => setMessageInfo(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                <ClearIcon />
              </button>
            )}
            <button
              style={SocialHubStyle.messageInputButton}
              onClick={handleSendMessage}
            >
              {messageInfo ? "Update" : "Send"}
            </button>
          </div>
        </Box>
      )}

      {/* Floating Chat Button at Bottom-Right */}
      <Box
        onClick={handleChatToggle}
        sx={{
          position: 'fixed',
          bottom: '10px',
          right: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        <ChatBubbleIcon sx={{ fontSize: 110, color: '#22a9d3' }} />
        <Typography
          sx={{
            position: 'absolute',
            bottom: '45px',
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: "white"
          }}
        >
          Chat with a Therapist!
        </Typography>
      </Box>
    </>
  );
}

export default PrivateChat;
