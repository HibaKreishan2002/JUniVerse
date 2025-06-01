
const SocialHubStyle = {

  DateTimeStyle:{
fontSize:"10px"
  },

  rightPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#fff",
    width: "80%",
    maxWidth: "1000px",
    height: "85vh", // Set height to ensure it fits the screen
    margin: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    position: "relative", // Ensures positioning of the input field
  },
  chatArea: {
    flex: 1, 
    padding: "20px",
    overflowY: "auto", // Enable scrolling
  },

  receivedMessage: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "55%",
    marginLeft:"auto",
    wordWrap:"break-word", 
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap", 
  },
  sentMessage: {
    backgroundColor: "#d1e7dd",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    alignSelf: "flex-end",
    maxWidth: "55%",
    wordWrap: "break-word", 
    overflowWrap: "break-word", 
    whiteSpace: "pre-wrap", 

  },
  messageInput: {
    display: "flex",
    borderTop: "1px solid #ddd",
    padding: "10px",
    position: "sticky",
    backgroundColor: "#fff", // Ensure it has a background to not overlap content
  },
  messageInputField: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginRight: "10px",
  },
  messageInputButton: {
    padding: "10px 20px",
    backgroundColor: "#3873d4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  content:{
    marginBottom:0
  },
  senderUsername: {
    fontWeight: "bold",
    color: "#333",
    fontSize: "17px",
    marginBottom: "1px",
    marginTop: 0
  },

};

export default SocialHubStyle;
