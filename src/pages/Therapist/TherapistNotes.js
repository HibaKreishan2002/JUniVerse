import React, { useEffect, useState } from "react";
import TherapistChatsStyle from "./TherapistChatsStyle.js";
import { Button, Modal, TextField, Box, Typography, Badge, Menu, MenuItem, IconButton , InputAdornment } from '@mui/material';
import JuUniVerseAxios from "../../API/JuUniVerseAxios.js";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from "sweetalert2";



function TherapistNotes() {
  const [dataStudent, setDataStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [notes, setNotes] = useState({}); // Initialize notes as an object to store notes by user ID
  const [openModal, setOpenModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [note, setNote] = useState(""); // Note state
  const [txtModelBtn, setTxtModelBtn] = useState("Save"); // Note state
  // add them for 3 dots
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  // add them for 3 dots


  //Get all users data (Chats)
  useEffect(() => {
    const getAllChats = async () => {
      try {
        const res = await JuUniVerseAxios.get("/private-chat/allTherapistChats");
        setDataStudent(res?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    getAllChats();
    const interval = setInterval(getAllChats, 5000);
    return () => clearInterval(interval); //??
  }, []);

//Filtering users for teh Search
  const filteredUsers = dataStudent.filter(user =>
    `${user.userFirstName} ${user.userLastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getNotes = async () => {
    if (notes[selectedUser.id]) return;

    try {
      const res = await JuUniVerseAxios.get(`/therapist-chat/${selectedUser.id}/notes`);
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedUser.id]: res?.data?.data || [] 
      }));
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
//مو فاهمة
  useEffect(() => {
    if (!selectedUser?.id) return;

 

    getNotes();
    const interval = setInterval(getNotes, 3000); 
    return () => clearInterval(interval); 
  }, [selectedUser]); 
  //مو فاهمةة//

  // Handle user selection
  const handleClick = (event, user) => {
    setSelectedUser(user);
  };

  // Handle saving a new note
  const handleSaveNote = () => {
    if (noteTitle && noteDescription && selectedUser) {
      const noteRequest = {
        title: noteTitle,
        description: noteDescription,
        privateChatId: selectedUser.id,
      };

      JuUniVerseAxios.post(`/therapist-chat/notes/note?title=${noteTitle}&description=${noteDescription}&privateChatId=${selectedUser.id}`, noteRequest)
        .then(() => {
          setNotes((prevNotes) => ({
            ...prevNotes,
            [selectedUser.id]: [
              ...(prevNotes[selectedUser.id] || []),
              { title: noteTitle, desc: noteDescription },
            ],
          }));
          setOpenModal(false);
          setNoteTitle("");
          setNoteDescription("");
        })
        .catch((error) => console.error("Error saving note:", error));
    }
  };
  //3 dots
  
  const handleMenuClick = (event, note) => {
    setAnchorEl(event.currentTarget);
    setSelectedNote(note);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNote(null);
  };

  const handleEditNote = () => {
   
    setOpenModal(true)

    JuUniVerseAxios.put(`/therapist-chat/notes/note/${selectedNote.id}?title=${noteTitle}&description=${noteDescription}`).then(res=>{

    })
    
    console.log('Edit note', selectedNote);
    setOpenModal(false)
    handleMenuClose();

  };

  const handleDeleteNote = () => {
     Swal.fire({
        title: `Do you want to Delete "${selectedNote.title}" note?`,
        showCancelButton: true,
        showDenyButton: true,
        showConfirmButton: false,
        denyButtonText: `Delete`
      }).then((result) => {
        if (result.isDenied) {
          // Second Swal: Warning about related files being deleted
          JuUniVerseAxios.delete(`/therapist-chat/notes/note/${selectedNote.id}`).then(res=>{
            setNotes({})
                        Swal.fire({
              title: 'Note Deleted Successfully!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          })              
          // Optionally show a success message after deletion
       
        }
      });

    console.log('Delete note', selectedNote);
    handleMenuClose();
  };
  
  // done 3 dots
  return (
    <div style={TherapistChatsStyle.chatPage}>
      <div style={TherapistChatsStyle.leftPanel}>
        <h2 style={TherapistChatsStyle.leftPanelHeader}>Messages</h2>
        <TextField
          fullWidth
          placeholder="Search users..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={()=>{setSelectedUser(null); setNotes({});}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />
        <ul style={TherapistChatsStyle.userList}>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={(e) => handleClick(e, user)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9e9e9")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              style={{
                ...TherapistChatsStyle.userListItem,
                border: selectedUser?.id === user.id ? "3px solid black" : "1px solid #ddd",
                fontWeight: selectedUser?.id === user.id ? "bold" : "normal",
              }}
            >
              <Badge badgeContent={user.therapistUnreadMessagesCount} color="error">
                <span style={{ padding: 7 }}>{user.userFirstName} {user.userLastName}</span>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div style={TherapistChatsStyle.rightPanel}>
        {selectedUser && (
          <>
            <Typography sx={{ fontWeight: "bold", color: "black", marginTop: 3 }}>
              {selectedUser.userFirstName} {selectedUser.userLastName}
            </Typography>
             <Button variant="contained" color="primary" sx={{ width: "120px", alignSelf: "flex-end", marginLeft: "auto", marginBottom:2  }}
              onClick={() => { setTxtModelBtn("Save")
                setOpenModal(true)

              }}>
              Add Note
            </Button>
            <div style={TherapistChatsStyle.notesBox}>
              {notes[selectedUser.id]?.map((note, index) => (
                
                <Box key={index} sx={{ border: "1px solid #ccc", padding: 2, marginTop: 2 }}>
                   <IconButton onClick={(e) => handleMenuClick(e, note)} sx={{float:"right"}}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem      onClick={() => { setTxtModelBtn("Update")
                      setNoteTitle(selectedNote.title)
                      setNoteDescription(selectedNote.description)
                setOpenModal(true)
                

              }}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteNote}>Delete</MenuItem>
                  </Menu>
                  <Typography variant="h6" sx={{fontWeight:"bold"}}>{note.title}</Typography>
                  <Typography>{note.description}</Typography>

                  {/* MoreVert Icon and Menu */}
                 
                </Box>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal for Adding Notes */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ width: 550, height: 350, backgroundColor: "white", padding: 3, margin: "10% auto", borderRadius: 2 }}>
          <TextField fullWidth label="Title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} sx={{ marginBottom: 2 }} />
          <TextField fullWidth label="Description" multiline rows={6} value={noteDescription} onChange={(e) => setNoteDescription(e.target.value)} sx={{ marginBottom: 2 }} />
        <Box sx={{float:'right'}}>
          <Button  variant="outlined" color="secondary" sx={{marginRight:1}}  onClick={()=>{setOpenModal(false)
          }}  >
          Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={()=>{
if (txtModelBtn == 'Update') {

  handleEditNote();
} else {
  handleSaveNote();
}

          }} disabled={!noteTitle || !noteDescription}>
            {txtModelBtn}
          </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TherapistNotes;