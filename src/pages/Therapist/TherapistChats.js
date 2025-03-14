import React, { useEffect, useState, useRef } from "react";
import TherapistChatsStyle from "./TherapistChatsStyle.js";
import { Typography, Badge, IconButton, Menu, MenuItem , TextField, InputAdornment ,Button} from "@mui/material";
import JuUniVerseAxios from "../../API/JuUniVerseAxios.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from '@mui/icons-material/Clear';
import { Navigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search"; 


function TherapistChats() {
  const [dataStudent, setDataStudent] = useState([]);
  const [message, setMessage] = useState("");
  const [chatID, setChatID] = useState(null);
  const [data, setData] = useState([]);
  const [receiverUsername, setReceiverUsername] = useState("");
  const [receiverFullName, setReceiverFullName] = useState("");
  const chatContainerRef = useRef(null);
  const hasScrolledOnceRef = useRef(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messageInfo, setMessageInfo] = useState(null);
  const [menuData, setMenuData] = useState({ anchorEl: null, selectedMsg: null });
  const [searchQuery, setSearchQuery] = useState("");

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
  const filteredUsers = dataStudent.filter(user =>
    `${user.userFirstName} ${user.userLastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const handleClose = () => {
    setMenuData({ anchorEl: null, selectedMsg: null });
  };

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

  const handleClick = (event, msg) => {
    setMenuData({ anchorEl: event.currentTarget, selectedMsg: msg });
  };

  useEffect(() => {
    if (chatContainerRef.current && !hasScrolledOnceRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        hasScrolledOnceRef.current = true;
      }, 90);
    }
  }, [chatID]);

  const handleSendMessage = () => {
    if (messageInfo) {
      JuUniVerseAxios.put(`/private-chat/${messageInfo.id}`, { content: messageInfo.content })
        .then(() => {
          setMessageInfo(null);
          setRefreshPage(refreshPage + 1);
        })
        .catch((error) => console.log(error));
    } else {
      try {
         JuUniVerseAxios.post("/private-chat/messageFromTherapist", {
          privateChatId: chatID,
          receiverUsername,
          content: message,
        });
        setMessage("");
      } catch (error) {
        console.error(error);
      }
    }
  };


  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div style={TherapistChatsStyle.chatPage}>
      <div style={TherapistChatsStyle.leftPanel}>
        <h2 style={TherapistChatsStyle.leftPanelHeader}>Messages</h2>
        <Button onClick={()=>         { setMessageInfo(null);
 setChatID(null)
 setData([])
 setReceiverFullName("")
 setSelectedUserId(null)}}>Reset</Button>
        <TextField
          fullWidth
          placeholder="Search users..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />
        <ul style={TherapistChatsStyle.userList}>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => {
                setChatID(user.id);
                setReceiverUsername(user.userUsername);
                setReceiverFullName(user.userFirstName + " " + user.userLastName);
                setSelectedUserId(user.id);
                hasScrolledOnceRef.current = false;
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9e9e9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              style={{
                ...TherapistChatsStyle.userListItem,
                border: user.id === selectedUserId ? "3px solid black" : "1px solid #ddd",
                fontWeight: user.id === selectedUserId ? "bold" : "normal",
              }}
            >
              <Badge badgeContent={user.therapistUnreadMessagesCount} color="error">
                <span style={{ padding: 7 }}>{user.userFirstName} {user.userLastName}</span>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div style={TherapistChatsStyle.rightPanel}>
        <Typography sx={{ fontWeight: "bold", color: "black", marginTop: 3 }}>{receiverFullName}</Typography>
        <hr />
        <div style={{ ...TherapistChatsStyle.chatArea, flexGrow: 1 }} ref={chatContainerRef}>
          {data
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((msg) => (
              <div key={msg.id} style={{ position: "relative" }}>
                {msg.senderUsername === "omar_khaled" && (
                  <IconButton onClick={(e) => handleClick(e, msg)} sx={{ float: "right" }}>
                    <MoreVertIcon />
                  </IconButton>
                )}

                <p
                  style={
                    msg.receiverUsername === receiverUsername
                      ? TherapistChatsStyle.receivedMessage
                      : TherapistChatsStyle.sentMessage
                  }
                >
                  {msg.content}
                  <br />
                  <sub style={TherapistChatsStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
                </p>
              </div>
            ))}
        </div>

        {/* Single Menu Component (Outside the Loop) */}
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
          {sessionStorage.getItem("role") === "ADMIN" || sessionStorage.getItem("role") === "MODERATOR" ? (
            <MenuItem
              onClick={() => {
                handleDeleteMessage(menuData.selectedMsg?.id);
                setMenuData({ anchorEl: null, selectedMsg: null });
              }}
            >
              Delete
            </MenuItem>
          ) : null}
        </Menu>

        {/* Message Input */}
        {chatID!=null?<div
          style={{
            ...TherapistChatsStyle.messageInput,
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
      <input
                type="text"
                value={messageInfo ? messageInfo.content : message}
                placeholder="Write a message"
                onChange={(e) =>
                  messageInfo
                    ? setMessageInfo({ ...messageInfo, content: e.target.value })
                    : setMessage(e.target.value)
                }
                style={TherapistChatsStyle.messageInputField}
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
                style={TherapistChatsStyle.messageInputButton}
                onClick={handleSendMessage}
              >
                {messageInfo ? "Update" : "Send"}
              </button>
            </div>:""}
        
      </div>
    </div>
  );
}

export default TherapistChats;
