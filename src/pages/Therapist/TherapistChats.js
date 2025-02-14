import React, { useEffect,useState } from "react";
import styles from "./TherapistChatsStyle.js"; // Import the JavaScript styles
import Header from "../../components/Header.js";
import { Typography } from "@mui/material";
import ResponsiveDev from "../../components/ResponsiveDev.js";
import axios from "axios";
import JuUniVerseAxios from "../../API/JuUniVerseAxios.js";
import Badge from '@mui/material/Badge';


function TherapistChats() {
  const [dataStudent,setDataStudent]=useState([])
  const [message,setMessage]=useState("");
  const [chatID,setChatID]=useState(0);
  const [data,setData]=useState([])
  const [refershPage,setRefershPage]=useState(0);
  const [receiverUsername,setReceiverUsername]=useState("")
  
  useEffect(()=>{
    JuUniVerseAxios.get(`/private-chat/allTherapistChats`).then(res=>{
      console.log(res?.data?.data);
      setDataStudent(res?.data?.data)
      
    }).catch(error=>{
      alert(error?.response?.data?.message)

    })


  },[])
  const handleSendMessage=()=>{

    console.log(receiverUsername);

    JuUniVerseAxios.post("/private-chat/messageFromTherapist",{ privateChatId: chatID, receiverUsername:receiverUsername , content:message }) .then((res) => {
      setMessage(""); // Clear the input field after sending
    //alert("MESSAGE SENT")
    setRefershPage(refershPage+1)
    }).catch((error)=>{
      alert(error?.response?.data?.message)
      console.log(error);
    
    })
    
      }
      useEffect(()=>{  
        JuUniVerseAxios.get(`/private-chat/${chatID}/allMessages`).then(res=>{
          console.log(res?.data?.data);
          setData(res?.data?.data)
          
        }).catch(error=>{
          // alert(error?.response?.data?.message)
    
        })
    
    
      },[chatID,refershPage])
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
  return (
    <>
    
      {/* <Header /> */}
      <div style={styles.chatPage}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <h2 style={styles.leftPanelHeader}>Messages</h2>
          <ul style={styles.userList}>
          {dataStudent.map((data)=>
                         
                      
                      <li onClick={()=>{setChatID(data.id)
                        setReceiverUsername(data.userUsername)
                      }} style={styles.userListItem}><Badge  badgeContent={data.therapistUnreadMessagesCount} color="error"> <span style={{padding:7}}>{data.userFirstName +' '+data.userLastName}  </span> </Badge> </li>

                 

)}
          </ul>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          {/* <header style={styles.chatHeader}>Therapists' Chats</header> */}
          <Typography sx={{ fontWeight: 'bold', color: 'Black' , marginTop:3}}>
  Chat
<hr/>
</Typography>
          <div style={styles.chatArea}>
          {data.map((data)=>
                
                "omar_khaled"!=data?.receiverUsername?(<p style={styles.receivedMessage}>{data?.content}<br/> <sub style={styles.DateTimeStyle}>{formatTimestamp(data.timestamp)}</sub></p>):<p style={styles.sentMessage}>{data?.content}<br/> <sub style={styles.DateTimeStyle}>{formatTimestamp(data.timestamp)}</sub></p>
              )}
         
          </div>
          <div style={styles.messageInput}>
            <input
              type="text"
              value={message}
              placeholder="Write a message"
              onChange={(e)=>setMessage(e.currentTarget.value)}
              style={styles.messageInputField}
            />
            <button style={styles.messageInputButton} onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TherapistChats;
