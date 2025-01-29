import React from "react";
import styles from "./TherapistChatsStyle.js"; // Import the JavaScript styles
import Header from "../../components/Header.js";
import { Typography } from "@mui/material";
import ResponsiveDev from "../../components/ResponsiveDev.js";

function TherapistChats() {
  return (
    <>
    
      {/* <Header /> */}
      <div style={styles.chatPage}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <h2 style={styles.leftPanelHeader}>Messages</h2>
          <ul style={styles.userList}>
            <li style={styles.userListItem}>Student 1</li>
            <li style={styles.userListItem}>Student 2</li>
            <li style={styles.userListItem}>Student 3</li>
            <li style={styles.userListItem}>Student 4</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          {/* <header style={styles.chatHeader}>Therapists' Chats</header> */}
          <Typography sx={{ fontWeight: 'bold', color: 'Black' }}>
  Chat
</Typography>

          <div style={styles.chatArea}>
            <p style={styles.receivedMessage}>This is a message from a student.</p>
            <p style={styles.sentMessage}>This is your reply.</p>
          </div>
          <div style={styles.messageInput}>
            <input
              type="text"
              placeholder="Write a message"
              style={styles.messageInputField}
            />
            <button style={styles.messageInputButton}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TherapistChats;
