import React from "react";
import styles from "./SocialHubStyle.js"; // Import the JavaScript styles
import Header from "../../components/Header.js";
import { Typography } from "@mui/material";
import SocialHubStyle from "./SocialHubStyle.js";
import ResponsiveDev from "../../components/ResponsiveDev.js";
function SocialHub() {
  return (
    <>
      {/* <Header /> */}
      <ResponsiveDev>
        <div style={SocialHubStyle.chatPage}>
          {/* Right Panel */}
          <div style={SocialHubStyle.rightPanel}>
            <Typography sx={{ fontWeight: "bold", color: "Black" }}>
              Chat
            </Typography>

            <div style={SocialHubStyle.chatArea}>
              
              <p style={SocialHubStyle.receivedMessage}>
                This is a message from a student.
              </p>
              <p style={SocialHubStyle.sentMessage}>This is your reply.</p>
            </div>
            <div style={SocialHubStyle.messageInput}>
              <input
                type="text"
                placeholder="Write a message"
                style={SocialHubStyle.messageInputField}
              />
              <button style={SocialHubStyle.messageInputButton}>Send</button>
            </div>
          </div>
        </div>
      </ResponsiveDev>
    </>
  );
}

export default SocialHub;
