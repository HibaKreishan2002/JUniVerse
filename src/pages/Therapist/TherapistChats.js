// Full TherapistChats component with auto-scroll after sending a message

import React, { useEffect, useState, useRef } from "react";
import TherapyVideo from '../../assets/Therapy.mp4'
import TherapistChatsStyle from "./TherapistChatsStyle.js";
import {
  Typography,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  styled,
  Box,
} from "@mui/material";
import JuUniVerseAxios from "../../API/JuUniVerseAxios.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import pdficon from '../../assets/images/pdficon.png'
import ImageIcon from '@mui/icons-material/Image';
import wordicon from '../../assets/images/wordicon.png'
import powerpointicon from '../../assets/images/powerpointicon.png'
import jsicon from '../../assets/images/jsicon.png'
import excelicon from '../../assets/images/excelicon.png'
import texticon from '../../assets/images/texticon.png'
import mp4icon from '../../assets/images/mp4icon.png'
import mp3icon from '../../assets/images/mp3icon.png'
import javaicon from '../../assets/images/javaicon.png'
import htmlicon from '../../assets/images/htmlicon.png'
import cssicon from '../../assets/images/cssicon.png'
import phpicon from '../../assets/images/phpicon.png'
import FileIcon from '@mui/icons-material/InsertDriveFile';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  const [hovered, setHovered] = useState(null);


const navigate=useNavigate();
  const [attachedFile, setAttachedFile] = useState(null);
  const [attachedFilePreviewUrl, setAttachedFilePreviewUrl] = useState(null);
  const [attachedFileBase64, setAttachedFileBase64] = useState(null);
  const [attachedFileName, setAttachedFileName] = useState("");
  const [attachedFileExtension, setAttachedFileExtension] = useState("");


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

const filteredUsers = dataStudent.filter((user) => {
  const fullName = `${user.userFirstName} ${user.userLastName}`.toLowerCase();
  const userIdString = user.userUserId.toString();
  return (
    fullName.includes(searchQuery.toLowerCase()) ||
    userIdString.includes(searchQuery)
  );
});

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
        setData([])
        console.error(error);
      }
    };
    getMessages();
    const interval = setInterval(getMessages, 3000);
    return () => clearInterval(interval);
  }, [chatID]);
const handleDeleteMessage = (id) => {
    JuUniVerseAxios.delete(`/private-chat/${id}`).then(() => {
          setRefreshPage(refreshPage + 1);
    }).catch(console.log);
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [data.length]);

  const handleSendMessage = async () => {
    // if (!message && !messageInfo) return;
    try {
      if (messageInfo) {
        await JuUniVerseAxios.put(`/private-chat/${messageInfo.id}`, {
          content: messageInfo.content,
        });
        setMessageInfo(null);
      } else {
        if (message){
        await JuUniVerseAxios.post("/private-chat/messageFromTherapist", {
          privateChatId: chatID,
          receiverUsername,
          content: message,
        }).then(res=>{
          setMessage("");

        }).catch(err=>{
          console.log(err);
          
        });}
        console.log(attachedFileBase64);
        
        if (attachedFileBase64) {
          const fileUploadPayload = {
            name: attachedFileName,
            extension: attachedFileExtension,
            fileAsBase64: attachedFileBase64,
          };
  
          JuUniVerseAxios.post(`/private-chat/${chatID}/attachFileFromTherapist`, fileUploadPayload)
            .then(() => {
              setAttachedFile(null);
              setAttachedFilePreviewUrl(null);
              setAttachedFileBase64(null);
              setAttachedFileName("");
              setAttachedFileExtension("");
            })
            .catch((error) => console.log(error));
        }
      }
    


      // Scroll to bottom after sending
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      console.warn("No file selected");
      return;
    }

    console.log("Selected file:", file);

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      if (!result) {
        console.error("Failed to read file as Base64");
        return;
      }

      const base64 = result.split(",")[1];
      const fileExtension = file.name.split(".").pop();
 const mimeTypes = {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        xls: "application/vnd.ms-excel",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ppt: "application/vnd.ms-powerpoint",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        css: "text/css",
        html: "text/html",
        txt: "text/html",
        php: "application/x-httpd-php",
        java: "text/x-java-source",
        mp4: "video/mp4",
        mp3: "audio/mpeg",
        js: "application/javascript",
        mpeg: "video/mpeg",
      };

      const mimeType = mimeTypes[fileExtension.toLowerCase()];
      if (!mimeType) {
        Swal.fire({
          title: `Unsupported file type!`,
          icon: "error",

          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: "OK"


        })
          ; return;
      }
      setAttachedFile(file);
      setAttachedFileBase64(base64);
      setAttachedFilePreviewUrl(URL.createObjectURL(file));
      setAttachedFileName(file.name);
      setAttachedFileExtension(fileExtension);

      console.log("Base64 ready:", base64.slice(0, 30) + "...");
    };

    reader.onerror = (err) => {
      console.error("Error reading file:", err);
    };

    reader.readAsDataURL(file);
  };
  
  const getFileByID = (fileID, transition) => {
    JuUniVerseAxios.get(`/files/file/${fileID}`).then(res => {
      console.log(res)
  
      if (transition == "Download") {
        handleDownload(res.data.data.fileAsBase64, "JuUnFile", res.data.data.extension)
      } else {
  
        handleView(res.data.data.fileAsBase64, res.data.data.extension)
      }
    })
      .catch(err => {
  
      })
  }
  const handleDownload = (base64FileContent, fileName, fileExtension) => {
    const mimeTypes = {
           xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
           xls: "application/vnd.ms-excel",
           pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
           ppt: "application/vnd.ms-powerpoint",
           png: "image/png",
           jpg: "image/jpeg",
           jpeg: "image/jpeg",
           pdf: "application/pdf",
           doc: "application/msword",
           docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
           css: "text/css",
           html: "text/html",
           txt: "text/html",
           php: "application/x-httpd-php",
           java: "text/x-java-source",
           mp4: "video/mp4",
           mp3: "audio/mpeg",
           js: "application/javascript",
           mpeg: "video/mpeg",
         };
   
         const mimeType = mimeTypes[fileExtension.toLowerCase()];
         if (!mimeType) {
           Swal.fire({
             title: `Unsupported file type!`,
             icon: "error",
   
             showCancelButton: true,
             showConfirmButton: false,
             cancelButtonText: "OK"
   
   
           })
             ; return;
         }
  
    // Convert Base64 to binary
    const byteCharacters = atob(base64FileContent);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
  
    // Create object URL
    const url = URL.createObjectURL(blob);
  
    // Create a temporary anchor tag to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${fileExtension}`; // Set filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    // Revoke the object URL to free memory
    URL.revokeObjectURL(url);
  };
  const handleView = (base64FileContent, fileExtension) => {
    const mimeTypes = {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xls: "application/vnd.ms-excel",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ppt: "application/vnd.ms-powerpoint",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      css: "text/css",
      html: "text/html",
      txt: "text/html",
      php: "application/x-httpd-php",
      java: "text/x-java-source",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      js: "application/javascript",
      mpeg: "video/mpeg",
    };
  
    const mimeType = mimeTypes[fileExtension.toLowerCase()];
    if (!mimeType) {
      alert("Unsupported file type");
      return;
    }
  
    // Convert Base64 to binary
    const byteCharacters = atob(base64FileContent);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
  
    // Create object URL and open in new tab
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };



  return (
    <div style={TherapistChatsStyle.chatPage}>
      <div style={TherapistChatsStyle.leftPanel}>
        <h2 style={TherapistChatsStyle.leftPanelHeader} onClick={() => {
          setMessageInfo(null);
          setChatID(null);
          setData([]);
          setReceiverFullName("");
          setSelectedUserId(null);
        }}>Messages</h2>

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
          {filteredUsers.map((user,index) => (
            <li
              key={user.id}
              onClick={() => {
                setChatID(user.id);
                setReceiverUsername(user.userUsername);
                setReceiverFullName(user.userFirstName + " " + user.userLastName);
                setSelectedUserId(user.id);
              }}
              style={{
                ...TherapistChatsStyle.userListItem,
                border: user.id === selectedUserId ? "3px solid black" : "1px solid #ddd",
                fontWeight: user.id === selectedUserId ? "bold" : "normal",
              }}
            >
              <Badge badgeContent={user.therapistUnreadMessagesCount} color="error">
                <span style={{ padding: 7 }}>{user?.userFirstName} {user?.userLastName} {`(${user?.userUserId})`}</span>
              </Badge>
            </li>
          ))}
        </ul>
      </div>
{selectedUserId?  <div style={TherapistChatsStyle.rightPanel}>
        <Typography sx={{ fontWeight: "bold", color: "black", marginTop: 3 }}>{receiverFullName}</Typography>
        <hr />

        <Box id="chatContainer" sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
          <div style={TherapistChatsStyle.chatArea} ref={chatContainerRef}>
            {data
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((msg,index) => (
                 msg.status === "SENT"?
                <div key={msg.id} style={{ position: "relative" }}>
              
                  {msg.file?
                  
                  
                  <p
                  style={
                    msg.receiverUsername === receiverUsername
                      ? TherapistChatsStyle.receivedMessage
                      : TherapistChatsStyle.sentMessage
                  }
                >
                    <IconButton onClick={(e) => setMenuData({ anchorEl: e.currentTarget, selectedMsg: msg })} sx={{ float: "right" }}>
                      <MoreVertIcon />
                    </IconButton>
    <div              onClick={()=> getFileByID(msg?.fileId)} 
>

                 {
                   msg.content.split(".")[msg.content.split(".")?.length-1] == "pdf" ? <img src={pdficon} width={'70px'} />
                   : msg.content.split(".")[msg.content.split(".")?.length-1] == "png" || msg.content.split(".")[msg.content.split(".")?.length-1] == "jpg" || msg.content.split(".")[msg.content.split(".")?.length-1] == "jpeg" ? <ImageIcon sx={{ fontSize: 75, color: "#247dd1" }} />
                     : msg.content.split(".")[msg.content.split(".")?.length-1] == "doc" || msg.content.split(".")[msg.content.split(".")?.length-1] == "docx" ? <img src={wordicon} width={'70px'} />
                       : msg.content.split(".")[msg.content.split(".")?.length-1] == "ppt" || msg.content.split(".")[msg.content.split(".")?.length-1] == "pptx" ? <img src={powerpointicon} width={'70px'} />
                         : msg.content.split(".")[msg.content.split(".")?.length-1] == "xls" || msg.content.split(".")[msg.content.split(".")?.length-1] == "xlsx" ? <img src={excelicon} width={'70x'} />
                           : msg.content.split(".")[msg.content.split(".")?.length-1] == "js" ? <img src={jsicon} width={'70px'} />
                             : msg.content.split(".")[msg.content.split(".")?.length-1] == "txt" ? <img src={texticon} width={'70px'} />
                               : msg.content.split(".")[msg.content.split(".")?.length-1] == "mp4" ? <img src={mp4icon} width={'70px'} />
                                 : msg.content.split(".")[msg.content.split(".")?.length-1] == "mp3" ? <img src={mp3icon} width={'70px'} />
                                   : msg.content.split(".")[msg.content.split(".")?.length-1] == "java" ? <img src={javaicon} width={'70px'} />
                                     : msg.content.split(".")[msg.content.split(".")?.length-1] == "php" ? <img src={phpicon} width={'70px'} />
                                       : msg.content.split(".")[msg.content.split(".")?.length-1] == "html" ? <img src={htmlicon} width={'70px'} />
                                         : msg.content.split(".")[msg.content.split(".")?.length-1] == "css" ? <img src={cssicon} width={'70px'} />
                                           : <FileIcon
                                             sx={{
                                               fontSize: 75,
                                               padding: 0,
                                               margin: '-32px',
                                               color: "#ffd35a",
                                               transition: "0.3s",
                                               cursor: "pointer",
                                             }}
                                             onClick={() => navigate(`/files/${file.id}`)} // Navigate to file screen
 
                                             onMouseEnter={() => setHovered(file.id)}
                                             onMouseLeave={() => setHovered(null)}
                                           />
              }  </div> 
                  <br/>
                  {msg.content.split(".")[0]}<br />
                  <sub style={TherapistChatsStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
                </p>
                  
                  :
                  
                  
                  
                  <p
                  style={
                    msg.receiverUsername === receiverUsername
                      ? TherapistChatsStyle.receivedMessage
                      : TherapistChatsStyle.sentMessage
                  }
                >
                  {msg.senderUsername=="omar_khaled"?
                     <IconButton onClick={(e) => setMenuData({ anchorEl: e.currentTarget, selectedMsg: msg })} sx={{ float: "right" }}>
                      <MoreVertIcon />
                    </IconButton>
                  :""}
                  
                  {msg.content}<br />
                  <sub style={TherapistChatsStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
                </p>
                  }
              
                </div>:""
              ))}
          </div>
        </Box>

        <Menu
          anchorEl={menuData.anchorEl}
          open={Boolean(menuData.anchorEl)}
          onClose={handleClose}
        >
          {menuData?.selectedMsg?.senderUsername === "omar_khaled"?
      <>
          <MenuItem
            onClick={() => {
              setMessageInfo({
                id: menuData.selectedMsg?.id,
                content: menuData.selectedMsg?.content
              });
              handleClose();
            }}
          >Edit</MenuItem>
              <MenuItem
            onClick={() => {
            
              handleDeleteMessage(menuData.selectedMsg?.id)
              handleClose();
            }}
          >Delete</MenuItem>
      </>
          :""}
        
          {menuData?.selectedMsg?.file?
          <>
            <MenuItem onClick={() => {
                      
                      // setFileID(menuData.selectedMsg?.id)
                       getFileByID(menuData.selectedMsg?.fileId)
          
                      setMenuData({ anchorEl: null });
                      console.log(menuData.selectedMsg);
                      // setOpenViewer(true)
                    }}>View</MenuItem>
                     <MenuItem onClick={() => {
          
                      // setFileID(menuData.selectedMsg?.id)
                       getFileByID(menuData.selectedMsg?.fileId, "Download")
          
                      setMenuData({ anchorEl: null });
                      console.log(menuData.selectedMsg.fileId);
                    }}>Download</MenuItem>
          </>
             :""}
        
                   
        </Menu>

          {attachedFile && (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: "gray" }}>{attachedFile.name}</Typography>
                {attachedFile.type.startsWith('image/') && (
                  <img src={attachedFilePreviewUrl} alt="preview" width={40} height={40} style={{ borderRadius: 4 }} />
                )}
              </Box>
            )}
        {chatID != null && (
          <div style={{ ...TherapistChatsStyle.messageInput, position: "sticky", bottom: 0, backgroundColor: "#fff" }}>
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
            

            {messageInfo && (
              <button
                onClick={() => setMessageInfo(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", marginRight: "10px" }}
              >
                <ClearIcon />
              </button>
            )}
            <label style={{ cursor: 'pointer', marginRight: 5 }}>
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
              <AttachFileIcon sx={{ color: 'black', float: 'left' }} />
            </label>
            <button
              style={TherapistChatsStyle.messageInputButton}
              onClick={handleSendMessage}
            >
              {messageInfo ? "Update" : "Send"}
            </button>
          </div>
        )}
      </div>:
  <div style={{ perspective: '1000px', padding: '2rem', margin:'auto',paddingTop:"55px"}}>
          <Typography sx={{mb:2, fontWeight:'bold', fontFamily: '"Georgia", serif', fontStyle: 'italic',textAlign:'center'}}>Be the calm in someone’s storm.</Typography>

      <video   width={'600px'} height={'450px'}  autoPlay
      loop
      muted
      playsInline>

          <source src= {TherapyVideo} type="video/mp4"/>

      </video>
      </div>
      }
    
    </div>
  );
}

export default TherapistChats;