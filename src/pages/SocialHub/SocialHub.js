import React, { useEffect, useState, useRef } from 'react';
import Header from "../../components/Header.js";
import JuUniVerseAxios from '../../API/JuUniVerseAxios';
import { Typography, Box, Button, IconButton, Menu, MenuItem, TextField ,styled} from "@mui/material";
import SocialHubStyle from "./SocialHubStyle.js";
import ResponsiveDev from "../../components/ResponsiveDev.js";
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
  //Added by HIBA
  
   const handleDeleteSenderMessage = (id) => {
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
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
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
     const convertToBase64 = async (file, name) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          console.log(reader.result);
          const Base64 = reader.result.split(",")[1];
          setFileName(file.name);
          setBase64File(Base64)
          const fileExtensionBase = file.name.split(".");
          setFileExtension( fileExtensionBase[fileExtensionBase.length - 1])
          console.log(fileExtensionBase[fileExtensionBase.length - 1]);
    
        }
          ;
        reader.readAsDataURL(file);
      };
      const handleInputChange = (e) => {
        const { name, value, files } = e.target;
    
        if (files) {
          const file = files[0];
          console.log(file);
    
          const base64 = convertToBase64(file, name);
    
    
    
        };
    
      }

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
                ((msg.senderRole!="ADMIN"||(msg.senderUsername==sessionStorage.getItem("username"))))?
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
          
          {/* <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
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
          </Menu> */}
          <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
  {/* Edit and Delete (if sender) */}
  {selectedMsg && sessionStorage.getItem("username") === selectedMsg.senderUsername && (
    <>
      <MenuItem
        onClick={() => {
          setMessageInfo({ id: selectedMsg.id, content: selectedMsg.content });
          handleMenuClose();
        }}
      >
        Edit
      </MenuItem>
{/* 
      <MenuItem
        onClick={() => {
          handleDeleteSenderMessage(selectedMsg.id);
          handleMenuClose();
        }}
      >
        Delete
      </MenuItem> */}
    </>
  )}

  {/* Delete (if ADMIN or MODERATOR) */}
  {selectedMsg &&
    (sessionStorage.getItem("role") === "ADMIN" ||
      sessionStorage.getItem("role") === "MODERATOR"  || sessionStorage.getItem("username") === selectedMsg.senderUsername)  && (
      <MenuItem
        onClick={() => {
          handleDeleteMessage(selectedMsg.id);
          handleMenuClose();
        }}
      >
        Delete
      </MenuItem>
    )}

  {console.log(selectedMsg)}
</Menu>

          <div style={SocialHubStyle.messageInput}>
            <input
              type="text"
              value={messageInfo ? messageInfo.content : message}
              placeholder="Write a message"
              onChange={(e) => messageInfo ? setMessageInfo({ ...messageInfo, content: e.target.value }) : setMessage(e.target.value)}
              style={SocialHubStyle.messageInputField}
            />
               {/* <Button sx={{  backgroundColor:'transparent', boxShadow:'none',border:'none',marginRight:'5' }}
          component="label"
          role={undefined}
          tabIndex={-1}
    
          // startIcon={  <AttachFileIcon/>}
        >
       <VisuallyHiddenInput
            type="file"
            onChange={handleInputChange}

          /> 
          <AttachFileIcon sx={{color:'black',float:'left' ,"& .MuiOutlinedInput-root": {
   "&:hover": {
      backgroundColor: "none",
      boxShadow: "none",
    }},}}/>
        </Button> */}
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
