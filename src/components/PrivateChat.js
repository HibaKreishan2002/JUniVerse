import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem, Button, styled, Badge } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClearIcon from '@mui/icons-material/Clear';
import SocialHubStyle from '../pages/SocialHub/SocialHubStyle';
import JuUniVerseAxios from '../API/JuUniVerseAxios';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import pdficon from '../assets/images/pdficon.png'
import ImageIcon from '@mui/icons-material/Image';
import wordicon from '../assets/images/wordicon.png'
import powerpointicon from '../assets/images/powerpointicon.png'
import jsicon from '../assets/images/jsicon.png'
import excelicon from '../assets/images/excelicon.png'
import texticon from '../assets/images/texticon.png'
import mp4icon from '../assets/images/mp4icon.png'
import mp3icon from '../assets/images/mp3icon.png'
import javaicon from '../assets/images/javaicon.png'
import htmlicon from '../assets/images/htmlicon.png'
import cssicon from '../assets/images/cssicon.png'
import phpicon from '../assets/images/phpicon.png'
import FileIcon from '@mui/icons-material/InsertDriveFile';
import FileViewer from 'react-file-viewer';
import Swal from 'sweetalert2';

function PrivateChat() {
  const chatRef = useRef(null);
  const [startChat, setStartChat] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [refreshPage, setRefreshPage] = useState(0);
  const [scrollPage, setScrollPage] = useState(0);
  const [data, setData] = useState([]);
  const [messageInfo, setMessageInfo] = useState(null);
  const [menuData, setMenuData] = useState({ anchorEl: null, selectedMsg: null });
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [hovered, setHovered] = useState(null);

  const [attachedFile, setAttachedFile] = useState(null);
  const [attachedFilePreviewUrl, setAttachedFilePreviewUrl] = useState(null);
  const [attachedFileBase64, setAttachedFileBase64] = useState(null);
  const [attachedFileName, setAttachedFileName] = useState("");
  const [attachedFileExtension, setAttachedFileExtension] = useState("");
  const [countUnreadMsg, setCountUnreadMsg] = useState(0);
  const [chatOpened, setChatOpened] = useState(false);
  
  // Refs for intervals to clean them up properly
  const messagePollingRef = useRef(null);
  const unreadCountPollingRef = useRef(null);

  // Memoized function to get all messages
  const getAllMessages = useCallback(async () => {
    try {
      const res = await JuUniVerseAxios.get(`/private-chat/allMessages`);
      setData(res?.data?.data || []);
      console.log("Messages updated:", res?.data?.data);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  }, []);

  // Memoized function to get unread message count
  const getUnreadCount = useCallback(async () => {
    try {
      const res = await JuUniVerseAxios.get("/private-chat");
      setCountUnreadMsg(res.data.data.userUnreadMessagesCount);
    } catch (err) {
      console.log("Error fetching unread count:", err);
    }
  }, []);

  const handleChatToggle = () => {
    setAttachedFile(null);
    setAttachedFilePreviewUrl(null);
    setAttachedFileBase64(null);
    setAttachedFileName("");
    setAttachedFileExtension("");
    setIsChatVisible(!isChatVisible);
    setScrollPage(scrollPage + 1);
    setChatOpened(true);
    setStartChat(false);

    // Immediately load messages when opening chat
    if (!isChatVisible) {
      getAllMessages();
    }
  };

  const handleClose = () => {
    setMenuData({ anchorEl: null, selectedMsg: null });
  };

  const handleClick = (event, msg) => {
    setMenuData({ anchorEl: event.currentTarget, selectedMsg: msg });
  };

  const handleSendMessage = async () => {
    if (messageInfo) {
      try {
        await JuUniVerseAxios.put(`/private-chat/${messageInfo.id}`, { content: messageInfo.content });
        setMessageInfo(null);
        // Immediately refresh messages after sending
        getAllMessages();
      } catch (error) {
        console.log(error);
      }
    } else {
      const payload = {
        content: message,
      };

      try {
        await JuUniVerseAxios.post("/private-chat/messageToTherapist", payload);
        setMessage("");
        // Immediately refresh messages after sending
        getAllMessages();
      } catch (error) {
        console.log(error);
      }

      // separately upload the file if any
      if (attachedFileBase64) {
        const fileUploadPayload = {
          name: attachedFileName,
          extension: attachedFileExtension,
          fileAsBase64: attachedFileBase64,
        };

        try {
          await JuUniVerseAxios.post("/private-chat/attachFileToTherapist", fileUploadPayload);
          setAttachedFile(null);
          setAttachedFilePreviewUrl(null);
          setAttachedFileBase64(null);
          setAttachedFileName("");
          setAttachedFileExtension("");
          // Refresh messages after file upload
          getAllMessages();
        } catch (error) {
          console.log(error);
        }
      }
    }
    
    setAttachedFile(null);
    setAttachedFilePreviewUrl(null);
    setAttachedFileBase64(null);
    setAttachedFileName("");
    setAttachedFileExtension("");
  };

  const handleDeleteMessage = async (id) => {
    try {
      await JuUniVerseAxios.delete(`/private-chat/${id}`);
      // Immediately refresh messages after deletion
      getAllMessages();
    } catch (error) {
      console.log(error);
    }
  };

  // Effect for managing real-time message polling when chat is open
  useEffect(() => {
    if (isChatVisible && chatOpened) {
      // Start polling for messages every 1 second
      messagePollingRef.current = setInterval(() => {
        getAllMessages();
      }, 1000);

      // Cleanup interval on unmount or when chat is closed
      return () => {
        if (messagePollingRef.current) {
          clearInterval(messagePollingRef.current);
          messagePollingRef.current = null;
        }
      };
    }
  }, [isChatVisible, chatOpened, getAllMessages]);

  // Effect for managing unread message count polling
  useEffect(() => {
    // Always poll for unread count every 3 seconds (less frequent than messages)
    unreadCountPollingRef.current = setInterval(() => {
      getUnreadCount();
    }, 3000);

    // Initial load
    getUnreadCount();

    // Cleanup interval on unmount
    return () => {
      if (unreadCountPollingRef.current) {
        clearInterval(unreadCountPollingRef.current);
        unreadCountPollingRef.current = null;
      }
    };
  }, [getUnreadCount]);

  // Effect for auto-scrolling to bottom when new messages arrive
  useEffect(() => {
    const chatBox = document.getElementById("chatContainer");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [data.length, scrollPage]);

  // Cleanup intervals on component unmount
  useEffect(() => {
    return () => {
      if (messagePollingRef.current) {
        clearInterval(messagePollingRef.current);
      }
      if (unreadCountPollingRef.current) {
        clearInterval(unreadCountPollingRef.current);
      }
    };
  }, []);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
  }

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
        });
        return;
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

  const getFileByID = async (fileID, transition) => {
    try {
      const res = await JuUniVerseAxios.get(`/files/file/${fileID}`);
      console.log(res);

      if (transition === "Download") {
        handleDownload(res.data.data.fileAsBase64, "JuUnFile", res.data.data.extension);
      } else {
        handleView(res.data.data.fileAsBase64, res.data.data.extension);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      txt: "text/plain",
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

    const byteCharacters = atob(base64FileContent);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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

    const byteCharacters = atob(base64FileContent);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <>
      {isChatVisible && (
        <Box sx={{ position: 'fixed', bottom: '10px', right: '20px', backgroundColor: '#fff', width: 400, height: 500, borderRadius: '10px', display: 'flex', flexDirection: 'column', padding: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)', zIndex: 1001 }}>
          <IconButton sx={{ position: 'absolute', top: '10px', right: '10px', color: '#d32f2f' }} onClick={handleChatToggle}>X</IconButton>
          <Typography sx={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Chat</Typography>

          <Box id="chatContainer" sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
            <div style={SocialHubStyle.chatArea}>
              {data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((msg) =>
                msg.status === "SENT" ?
                  msg.senderUsername !== "omar_khaled" ? (msg.file ?
                    <div key={msg.id} style={{ position: "relative" }}>
                      <IconButton onClick={(e) => handleClick(e, msg)} sx={{ float: "right" }}><MoreVertIcon /></IconButton>
                      <p index={msg.id} style={{ ...SocialHubStyle.receivedMessage, cursor: "pointer" }} >
                        <div onClick={() => getFileByID(msg?.fileId)}>
                          {msg.content.split(".")[msg.content.split(".")?.length-1] == "pdf" ? <img src={pdficon} width={'70px'} />
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
                                                      onClick={() => navigate(`/files/${file.id}`)}
                                                      onMouseEnter={() => setHovered(file.id)}
                                                      onMouseLeave={() => setHovered(null)}
                                                    />}<br /><sub>{msg.content.split(".")[0]}</sub><br /><sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
                        </div>
                      </p>
                    </div>
                    :
                    <div key={msg.id} style={{ position: "relative" }}>
                      <IconButton onClick={(e) => handleClick(e, msg)} sx={{ float: "right" }}><MoreVertIcon /></IconButton>
                      <p index={msg.id} style={SocialHubStyle.receivedMessage}>{msg.content}<br /><sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub></p>
                    </div>
                  ) : (
                    msg.file ?
                      <div key={msg.id} style={{ position: "relative" }}>
                        <p style={SocialHubStyle.sentMessage}>
                          <IconButton onClick={(e) => handleClick(e, msg)} sx={{ float: "right" }}><MoreVertIcon /></IconButton>
                          <div onClick={() => getFileByID(msg?.fileId)}>
                            {msg.content.split(".")[msg.content.split(".")?.length-1] == "pdf" ? <img src={pdficon} width={'70px'} />
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
                                                        onClick={() => navigate(`/files/${file.id}`)}
                                                        onMouseEnter={() => setHovered(msg.id)}
                                                        onMouseLeave={() => setHovered(null)}
                                                      />}<br /><sub>{msg.content.split(".")[0]}</sub><br /><sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub>
                          </div>
                        </p>
                      </div>
                      :
                      <p key={msg.id} style={SocialHubStyle.sentMessage}>{msg.content}<br /><sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(msg.timestamp)}</sub></p>
                  ) : ""
              )}
            </div>
          </Box>

          <Menu anchorEl={menuData.anchorEl} open={Boolean(menuData.anchorEl)} onClose={handleClose} elevation={8} sx={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", borderRadius: "8px" }}>
            {menuData.selectedMsg && sessionStorage.getItem("username") === menuData.selectedMsg.senderUsername ?
              <>
                <MenuItem onClick={() => {
                  setMessageInfo({ id: menuData.selectedMsg?.id, content: menuData.selectedMsg?.content });
                  setMenuData({ anchorEl: null, selectedMsg: null });
                }}>Edit</MenuItem>
                <MenuItem onClick={() => {
                  handleDeleteMessage(menuData.selectedMsg?.id);
                  handleClose();
                }}>Delete</MenuItem>
              </>
              : ""}

            {menuData.selectedMsg?.file ?
              <>
                <MenuItem onClick={() => {
                  getFileByID(menuData.selectedMsg?.fileId);
                  setMenuData({ anchorEl: null });
                  console.log(menuData.selectedMsg);
                }}>View</MenuItem>
                <MenuItem onClick={() => {
                  getFileByID(menuData.selectedMsg?.fileId, "Download");
                  setMenuData({ anchorEl: null });
                  console.log(menuData.selectedMsg.fileId);
                }}>Download</MenuItem>
              </>
              : ""}
          </Menu>

          {attachedFile && (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: "gray" }}>{attachedFile.name}</Typography>
              {attachedFile.type.startsWith('image/') && (
                <img src={attachedFilePreviewUrl} alt="preview" width={40} height={40} style={{ borderRadius: 4 }} />
              )}
            </Box>
          )}

          <div style={SocialHubStyle.messageInput}>
            <input
              type="text"
              value={messageInfo ? messageInfo.content : message}
              placeholder="Write a message"
              onChange={(e) => messageInfo ? setMessageInfo({ ...messageInfo, content: e.target.value }) : setMessage(e.target.value)}
              style={SocialHubStyle.messageInputField}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            {messageInfo && (
              <button onClick={() => setMessageInfo(null)} style={{ background: "transparent", border: "none", cursor: "pointer", marginRight: "10px" }}><ClearIcon /></button>
            )}
            <label style={{ cursor: 'pointer', marginRight: 5 }}>
              <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
              <AttachFileIcon sx={{ color: 'black', float: 'left' }} />
            </label>
            <button style={SocialHubStyle.messageInputButton} onClick={handleSendMessage}>{messageInfo ? "Update" : "Send"}</button>
          </div>
        </Box>
      )}

      <Box onClick={handleChatToggle} sx={{ position: 'fixed', bottom: '10px', right: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 1000 }}>
        <Badge badgeContent={countUnreadMsg} color="error">
          <ChatBubbleIcon sx={{ fontSize: 110, color: '#22a9d3' }} />
        </Badge>
        <Typography sx={{ position: 'absolute', bottom: '45px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center', color: "white" }}>Chat with a Therapist!</Typography>
      </Box>
    </>
  );
}

export default PrivateChat;