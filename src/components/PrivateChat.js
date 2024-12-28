import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import SocialHubStyle from '../pages/SocialHub/SocialHubStyle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';


function PrivateChat() {
  const [isChatVisible, setIsChatVisible] = useState(false);

  // Function to toggle chat visibility
  const handleChatToggle = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* If chat is not visible, show the Cloud Icon */}
      {/* shorthand if else (condition ?true : false)*/}  

      {/* If chat is visible, show the chat interface */}
      {isChatVisible?   (
        <Box
          sx={{
            backgroundColor: '#fff',
            width: 400,
            height: 500,
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            position: 'relative',
          }}
        >
          {/* Close Button */}
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

          <Box sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
            {/* Chat area */}
            <div style={SocialHubStyle.chatArea}>
              <p style={SocialHubStyle.receivedMessage}>This is a message from a student.</p>
              <p style={SocialHubStyle.sentMessage}>This is your reply.</p>
            </div>
          </Box>

          <div style={SocialHubStyle.messageInput}>
            <input
              type="text"
              placeholder="Write a message"
              style={SocialHubStyle.messageInputField}
            />
            <button style={SocialHubStyle.messageInputButton}>Send</button>
          </div>
        </Box>
      ):( 
        <Box
        onClick={handleChatToggle}
        sx={{
          position: 'relative',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight:'10px',
   cursor:'pointer',
          // width: 200,
          // height: 200,
          // backgroundColor: '#E50916',
          // borderRadius: '50%',
          // color: 'white',
          overflow: 'hidden',
        }}
      >
        <ChatBubbleIcon sx={{ fontSize: 110  , color:'#22a9d3'}} />
        <Typography
          sx={{
            position: 'absolute',
            bottom: '45px', // Adjust the position
            fontSize: '12px',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor:'pointer',
            color:"white"
          }}
        >
          Chat with a Therapist!
        </Typography>
      </Box>)}
    </Box>
  );
}

export default PrivateChat;
