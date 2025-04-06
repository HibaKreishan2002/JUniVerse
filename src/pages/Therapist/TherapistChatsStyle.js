const TherapistChats = {
    chatPage: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      // height: '50vh',
      fontFamily: 'Arial, sans-serif',
      //  marginTop:'1%',
      marginRight:'70px'
    },
    leftPanel: {
      backgroundColor: '#f5f5f5',
      paddingLeft: '14px',
      borderRight: '1px solid #ddd',
    },
    leftPanelHeading: {
      marginBottom: '10px',
      fontSize: '18px',
    },
    userList: {
      listStyle: 'none',
      padding: 0,
      overflowY: 'auto',  // Enables scrolling only inside the chat area
      maxHeight: '61vh',  // Limits the height to keep scrolling inside the box
      minHeight: '61vh',  // Ensures the height remains fixed
       flexDirection: 'column',
      
    },
    userListItem: {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer',
      
     

    },
    notesBox:{
      listStyle: 'none',
      padding: 0,
      overflowY: 'auto',  // Enables scrolling only inside the chat area
      maxHeight: '70vh',  // Limits the height to keep scrolling inside the box
      minHeight: '70vh',  // Ensures the height remains fixed
       flexDirection: 'column',
    },
    userListItem : {
      margin: '10px 0',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer',
     
     

    },
    userListItemHover: {
      backgroundColor: '#e9e9e9',
    },
    rightPanel: {
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'space-between',
      marginLeft: '28px',
      // height: '50vh', // Ensures it takes full height
      
      
      
    },
    chatHeader: {
      backgroundColor: '#333',
      color: '#fff',
      textAlign: 'center',
      fontSize: '18px',
    },
    chatArea: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',  // Enables scrolling only inside the chat area
      maxHeight: '60vh',  // Limits the height to keep scrolling inside the box
      minHeight: '60vh',  // Ensures the height remains fixed
       flexDirection: 'column',
    },

    receivedMessage: {
      backgroundColor: '#f0f0f0',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '10px',
      maxWidth: '70%',
       marginLeft:'auto',
       wordWrap:"break-word", // يجبر النص على النزول للسطر عند الحاجة
       overflowWrap: "break-word", // يعالج الكلمات الطويلة
       whiteSpace: "pre-wrap", // يحافظ على التنسيق والنزول التلقائي
       wordBreak: "break-word"
    },
    sentMessage: {
      backgroundColor: '#d1e7dd',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '10px',
      alignSelf: 'flex-end',
      maxWidth: '70%',
      wordWrap:"break-word", // يجبر النص على النزول للسطر عند الحاجة
      overflowWrap: "break-word", // يعالج الكلمات الطويلة
      whiteSpace: "pre-wrap", // يحافظ على التنسيق والنزول التلقائي
      wordBreak: "break-word"

    },
    messageInput: {
      display: 'flex',
      borderTop: '1px solid #ddd',
      padding: '10px',
      marginTop:'auto'
    },
    messageInputField: {
      flex: 1,
      // padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      marginRight: '10px',
    },
    messageInputButton: {
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    messageInputButtonHover: {
      backgroundColor: '#555',
    },
    DateTimeStyle:{
      fontSize:"10px"
        },
  };
  
  export default TherapistChats;
  