import React, { useEffect, useState ,useRef} from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import SocialHubStyle from '../pages/SocialHub/SocialHubStyle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import JuUniVerseAxios from '../API/JuUniVerseAxios';


function PrivateChat() {
  const chatRef = useRef(null);

  const [isChatVisible, setIsChatVisible] = useState(false);
const [message,setMessage]=useState("");
const [refershPage,setRefershPage]=useState(0);
const [scrollPage,setScrollPage]=useState(0);
const [data,setData]=useState([])
  // Function to toggle chat visibility
  const handleChatToggle = () => {
    setIsChatVisible(!isChatVisible);
    setScrollPage(scrollPage+1)
  };

  const handleSendMessage=()=>{

console.log(message);

JuUniVerseAxios.post("/private-chat/messageToTherapist",{content:message}).then((res) => {
  setMessage(""); // Clear the input field after sending
  setRefershPage(refershPage+1)
//alert("MESSAGE SENT")
}).catch((error)=>{
 // alert(error?.response?.data?.message)
  console.log(error);

})

  }
  useEffect(()=>{
    const getAllMessage= ()=>{

      JuUniVerseAxios.get(`/private-chat/allMessages`).then(res=>{
        console.log(res)
        setData(res.data.data)
  
      }).catch(error=>{
  //alert(error?.response?.data?.message)
      })
    }
    // getAllMessage();
    const interval =setInterval(getAllMessage,1000)
    return ()=>clearInterval(interval);

  },[refershPage])

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
  useEffect(() => {
    const chatBox = document.getElementById("chatContainer");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [scrollPage,data.length]); // Runs when `data` updates
  
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
        overflowY: "auto"
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

          {/* <Box sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}> */}
          <Box
               id="chatContainer" // Add an ID to target it

          sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px'  }}

>

  
            {/* Chat area */}
            <div style={SocialHubStyle.chatArea}>
              {data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((data)=>
                
                "omar_khaled"!=data.senderUsername?(<p index={data.id} style={SocialHubStyle.receivedMessage}>{data.content}<br/> <sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(data.timestamp)}</sub></p>):<p style={SocialHubStyle.sentMessage}>{data.content}<br/> <sub style={SocialHubStyle.DateTimeStyle}>{formatTimestamp(data.timestamp)}</sub></p>

                            //  condition ? true : false

              )}
            </div>
          </Box>

          <div style={SocialHubStyle.messageInput}>
            <input
              type="text"
              value={message}
              placeholder="Write a message"
              onChange={(e)=>setMessage(e.currentTarget.value)}
              style={SocialHubStyle.messageInputField}
            />
            <button style={SocialHubStyle.messageInputButton} onClick={handleSendMessage}>Send</button>
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
