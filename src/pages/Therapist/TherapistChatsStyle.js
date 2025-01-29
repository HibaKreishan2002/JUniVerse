const TherapistChats = {
    chatPage: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      height: '80vh',
      fontFamily: 'Arial, sans-serif',
      // marginTop:'1%',
      marginRight:'70px'
    },
    leftPanel: {
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRight: '1px solid #ddd',
    },
    leftPanelHeading: {
      marginBottom: '10px',
      fontSize: '18px',
    },
    userList: {
      listStyle: 'none',
      padding: 0,
      
    },
    userListItem: {
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
      justifyContent: 'space-between',
      marginLeft:'28px'
    },
    chatHeader: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px',
      textAlign: 'center',
      fontSize: '18px',
    },
    chatArea: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
    },
    receivedMessage: {
      backgroundColor: '#f0f0f0',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '10px',
      maxWidth: '70%',
    },
    sentMessage: {
      backgroundColor: '#d1e7dd',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '10px',
      alignSelf: 'flex-end',
      maxWidth: '70%',
    },
    messageInput: {
      display: 'flex',
      borderTop: '1px solid #ddd',
      padding: '10px',
    },
    messageInputField: {
      flex: 1,
      padding: '10px',
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
  };
  
  export default TherapistChats;
  