
const SocialHubStyle = {
  // chatPage: {
  //   display: 'flex',
  //   justifyContent: 'center', // Center content horizontally
  //   alignItems: 'center', // Center content vertically
  //  height:'80vh',
  //  width:'130vh',
  //  marginLeft:'20%',
  //   fontFamily: 'Arial, sans-serif',
  //   marginTop: '1%',
  // }
  DateTimeStyle:{
fontSize:"10px"
  },

  rightPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#fff",
    width: "80%", // Make the panel wider (adjust as necessary)
    maxWidth: "1000px", // Maximum width for the panel
    height: "100%", // Make it stretch to the full height of its container
    margin: "auto", // Center the panel
    borderRadius: "8px", // Optional: Add rounded corners
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow for depth
  },
  chatArea: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },
  receivedMessage: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "70%",
    marginLeft:"auto",
    wordWrap:"break-word", // يجبر النص على النزول للسطر عند الحاجة
    overflowWrap: "break-word", // يعالج الكلمات الطويلة
    whiteSpace: "pre-wrap", // يحافظ على التنسيق والنزول التلقائي
  },
  sentMessage: {
    backgroundColor: "#d1e7dd",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    alignSelf: "flex-end",
    maxWidth: "70%",
    wordWrap: "break-word", // يجبر النص على النزول للسطر عند الحاجة
    overflowWrap: "break-word", // يعالج الكلمات الطويلة
    whiteSpace: "pre-wrap", // يحافظ على التنسيق والنزول التلقائي

  },
  messageInput: {
    display: "flex",
    borderTop: "1px solid #ddd",
    padding: "10px",
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
};
export default SocialHubStyle;
