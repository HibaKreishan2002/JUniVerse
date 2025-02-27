import React, { useEffect, useState,useRef } from 'react';
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
  const [messageInfo, setMessageInfo] = useState(null); // New state for editing
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuData, setMenuData] = useState({ anchorEl: null, selectedMsg: null });
  const chatContainerRef = useRef(null);
  const hasScrolledOnceRef = useRef(false);
  const handleClick = (event, msg) => {
    setMenuData({ anchorEl: event.currentTarget, selectedMsg: msg });
  };

  const handleClose = () => {
    setMenuData({ anchorEl: null, selectedMsg: null });
  };

  const handleSendMessage = () => {
    if (messageInfo) {
      // If editing a message, update it
      JuUniVerseAxios.put(`/public-chat/${messageInfo.id}`, { content: messageInfo.content })
        .then(() => {
          setMessageInfo(null); // Reset editing state
          setRefershPage(refershPage + 1); // Refresh chat
        })
        .catch((error) => console.log(error));
    } else {
      // Normal message sending
      JuUniVerseAxios.post("/public-chat/message", { content: message })
        .then(() => {
          setMessage(""); // Clear input
          setRefershPage(refershPage + 1); // Refresh chat
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [data.length]); // Only triggers when the number of messages changes
  
  const handleDeletteMessage = (id) => {
    JuUniVerseAxios.delete(`/public-chat/${id}`).then(res => {
      setRefershPage(refershPage + 1); // Refresh chat

    })
      .catch((error) => {

      });

  }

  useEffect(() => {
  
    const getAllMessage = () => {
      JuUniVerseAxios.get(`/public-chat/messages`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Fetch messages every second
    const interval = setInterval(getAllMessage, 1000);
    return () => clearInterval(interval); // Clear interval on unmount
  }, [refershPage]);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
          .getSeconds()
          .toString()
          .padStart(2, "0")}`;
  }
  const HandleClickMenu = (id) => {
    console.log(id);

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
    <>
      <ResponsiveDev>
        <div style={SocialHubStyle.chatPage} >
          {/* Right Panel */}
          <div style={SocialHubStyle.rightPanel}>
            <Typography sx={{ fontWeight: "bold", color: "Black" }}>
              Chat
            </Typography>
            <div style={{...SocialHubStyle.chatArea, flexGrow: 1}}   ref={chatContainerRef} >
              {/* Chat area */}
              < >
                {data
                  .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                  .map((msg) => (
                    msg.status == "SENT" ? (
                      <div
                        key={msg.id}
                        style={
                          sessionStorage.getItem("username") === msg.senderUsername
                            ? SocialHubStyle.receivedMessage
                            : SocialHubStyle.sentMessage
                        }
                      >
                        <h4 style={{ ...SocialHubStyle.senderUsername }}>
                          <sup style={{color:getUsernameColor(msg.senderUsername)}}>

                            {msg.senderUsername}
                          </sup>
                        </h4>
                        {sessionStorage.getItem("username") === msg.senderUsername || (sessionStorage.getItem("role") == "ADMIN" || sessionStorage.getItem("role") == "MODERATOR") ? <div key={msg.id}>
                          <IconButton onClick={(e) => handleClick(e, msg)} sx={{ float: "right" }}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={menuData.anchorEl}
                            open={Boolean(menuData.anchorEl)}
                            onClose={handleClose}
                          >
                            {sessionStorage.getItem("username") === msg.senderUsername ? <MenuItem onClick={() => {
                              setMessageInfo({ id: menuData.selectedMsg?.id, content: menuData.selectedMsg?.content })
                              setMenuData({ anchorEl: null });

                            }}>
                              Edit
                            </MenuItem> : ""}

                            {sessionStorage.getItem("role") == "ADMIN" || sessionStorage.getItem("role") == "MODERATOR" ? <MenuItem onClick={() => {
                              handleDeletteMessage(menuData.selectedMsg?.id)
                              setMenuData({ anchorEl: null });
                            }}>Delete</MenuItem>
                              : ""
                            }

                          </Menu>
                        </div> : ""}
                        {/* <p style={SocialHubStyle.senderUsername}>{msg.senderUsername}</p>
                        <hr/> */}

                        <p style={SocialHubStyle.content}> {msg.content}</p>
                        <sub style={SocialHubStyle.DateTimeStyle}>
                          {formatTimestamp(msg.timestamp)}
                        </sub>
                        {/* Edit button */}


                      </div>) : ""


                  )

                  )}
              </>
            </div>

            {/* Message Input and Send/Update Button */}
            {/* Message Input and Send/Update Button */}
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

              {/* Show ClearIcon only when editing */}
              {messageInfo && (
                <button
                  onClick={() => setMessageInfo(null)} // Exit edit mode
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "10px", // Adjusts spacing between ClearIcon and Update button
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

          </div>
        </div>
      </ResponsiveDev>
    </>
  );
}

export default SocialHub;
