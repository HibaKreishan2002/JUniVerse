import React, { useState, useEffect } from "react";
import ResponsiveDev from "../../components/ResponsiveDev";
import FolderIcon from '@mui/icons-material/Folder';
import JuUniVerseAxios from "../../API/JuUniVerseAxios";
import { Box, Grid, Alert, Tooltip, Typography, Button, IconButton, TextField, tooltipClasses, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, styled, Modal } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";


function FileSharingHub() {
  const [folderDetails, setFolderDetails] = useState([]);
  const [folderName, setFolderName] = useState(" ");
  const [modelTitle, setModelTitle] = useState("Create Folder");
  const [folderDescription, setFolderDescription] = useState(" ");
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [refershPage, setRefershPage] = useState(0);
  const [folderID, setFolderID] = useState(0);
  const [FolderInfo, setFolderInfo] = useState(null); // New state for editing
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{setFolderName("");
    setFolderDescription("");
    setErrorMessage("")
    setOpen(false);} 
  const [hovered, setHovered] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuData, setMenuData] = useState({ anchorEl: null, selectedMsg: null });
  const navigate = useNavigate();

  useEffect(() => {
    JuUniVerseAxios.get("/folder").then((res) => {
      setFolderDetails(res?.data?.data)
    })
  }, [refershPage])

  const addFolder = () => {
    console.log(folderDescription);
    console.log(folderName);
    if (folderName==undefined || folderName.trim()==""){
      // handleClose();

     
      setErrorMessage("Please fill Folder Name")

      return;
    }
    if (folderDescription==undefined || folderDescription.trim()==""){

      setErrorMessage("Please fill Folder Description")
      
      return;
    }


    if (modelTitle == "Create Folder") {

      JuUniVerseAxios.post("/folder", { name: folderName, description: folderDescription }).then((res) => {
        setRefershPage(refershPage + 1);
        setFolderDescription("");
        setFolderName("");
        handleClose();
      })
    } else {
if (folderDescription!=undefined && folderDescription!=""){
  JuUniVerseAxios.put(`/folder/${folderID}/description`, { description: folderDescription }).then((res) => {
    setRefershPage(refershPage + 1);
    Swal.fire({
      title: "Success",
      text: "Updated Successfully",
      icon: "success"
    });
    setFolderDescription("");
    setFolderName("");
    handleClose();
  }).catch(err=>{console.log(err?.response?.data?.errorDescription)

      Swal.fire({
          title: "ERROR",
          text: err?.response?.data?.errorDescription,
          icon: "error"
        });
        handleClose();

  }
  )
}else{
  Swal.fire({
    title: "ERROR",
    text: "Please fill Folder Description",
    icon: "error"
  });
  handleClose();
}

if (folderName!=undefined && folderName!=""){
  JuUniVerseAxios.put(`/folder/${folderID}/name?folderName=${folderName}`).then((res) => {
    setRefershPage(refershPage + 1);
    Swal.fire({
      title: "Success",
      text: "Updated Successfully",
      icon: "success"
    });
    setFolderDescription("");
    setFolderName("");
    handleClose();
  }).catch(err=>{console.log(err?.response?.data?.errorDescription)

      Swal.fire({
          title: "ERROR",
          text: err?.response?.data?.errorDescription,
          icon: "error"
        });
        handleClose();

  }
  )
}else{
  Swal.fire({
    title: "ERROR",
    text: "Please fill Folder Description",
    icon: "error"
  });
  handleClose();
}
    }

  }
  const handleMenuClose = () => {
    setMenuData({ anchorEl: null, selectedMsg: null });
  };
  const handleClick = (event, folder) => {
    setMenuData({ anchorEl: event.currentTarget, selectedMsg: folder });
  };
  const handleDeletteFolders = (id) => {
    JuUniVerseAxios.delete(`/folder/${id}`).then(res => {
      setRefershPage(refershPage + 1); // Refresh chat
      return(Swal.fire("Deleted!", "", "success"))

    })
      .catch((error) => {  
console.log(error);
//

        return(Swal.fire(error.response.data.errorDescription, "", "error"))

      });

  }


  return (

    <ResponsiveDev>
      <Box sx={{
        float: "right"

      }}>
    {(sessionStorage.getItem("role") === "ADMIN" ) && (
        <Button variant={'contained'} sx={{ fontWeight: 'bold' }} onClick={() => {
          setModelTitle("Create Folder")
          handleOpen()
        }} >
          Add Folder

        </Button>)}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              borderRadius: 2,
            }}i
          >
            {errorMessage!=""?            <Alert severity="error">{errorMessage}</Alert>
:""}
            <Typography variant="h6" mb={2}>{modelTitle}

            </Typography>
            <TextField fullWidth label="Folder Name" variant="outlined" margin="normal" value={folderName}
              onChange={(e) => setFolderName(e.target.value)} required={true} />
            <TextField fullWidth label="Folder Description" variant="outlined" margin="normal" value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)} />
            <Box mt={2} display="flex" gap={2}>
              <Button variant="contained" color="primary" onClick={addFolder}>
                SAVE
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                CANCEL
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>

      <Box sx={{

        float: 'left'

      }}>
        <Grid container
          justifyContent="center"
          alignItems="center"
          rowSpacing={4}
          columnSpacing={15}
          sx={{ WebkitBoxPack: 'unset', WebkitJustifyContent: "start" }}

        >
        
          {folderDetails.map((folder, index) => (
            <Grid
              item
              xs={3}
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              
              spacing={2}
              sx={{ WebkitBoxPack: 'unset', WebkitJustifyContent: "start",cursor:'pointer',marginTop:5 }}

            >
                               {(sessionStorage.getItem("role") === "ADMIN" ) && (
<>
              <IconButton onClick={(e) => handleClick(e, folder)} sx={{ ml: 15, paddingBottom: 0 }}  >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={menuData.anchorEl}
                open={Boolean(menuData.anchorEl)}
                onClose={handleMenuClose}
              >
                
                <MenuItem onClick={() => {
                  setModelTitle("Edit Folder")
                  setFolderID(menuData.selectedMsg?.id)
                  setFolderName(menuData.selectedMsg?.name);
                  setFolderDescription(menuData.selectedMsg?.description);
                  handleOpen();
                  setMenuData({ anchorEl: null });
                  console.log(menuData.selectedMsg);

                }}>Edit</MenuItem>
           <MenuItem onClick={() => {
  setMenuData({ anchorEl: null });

  // First Swal: Confirm folder deletion
  Swal.fire({
    title: `Do you want to Delete "${menuData.selectedMsg?.name}" Folder?`,
    showCancelButton: true,
    showDenyButton: true,
    showConfirmButton: false,
    denyButtonText: `Delete`
  }).then((result) => {
    if (result.isDenied) {
      // Second Swal: Warning about related files being deleted
      Swal.fire({
        title: 'All related files are going to be deleted!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#d33',
        cancelButtonText: 'Cancel'
      }).then((warningResult) => {
        if (warningResult.isConfirmed) {
          // Proceed with deletion
          handleDeletteFolders(menuData.selectedMsg?.id);
          
          // Optionally show a success message after deletion
          Swal.fire({
            title: 'Folder Deleted Successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  });
}}>Delete</MenuItem>
              </Menu></>)}
              <Tooltip title={folder.description} placement="top" arrow                   onClick={() => navigate(`/files/${folder.id}`)} // Navigate to file screen


                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                      {
                        marginTop: '0px',
                      },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                      {
                        marginBottom: '0px',
                      },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                      {
                        marginLeft: '0px',
                      },
                      [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                      {
                        marginRight: '0px',
                      },
                    },
                  },
                }}
              >
                <FolderIcon
                  sx={{
                    fontSize: 150,
                    padding: 0,
                    margin: '-32px',
                    color: "#ADD8E6",
                    transition: "0.3s",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/files/${folder.id}`)} // Navigate to file screen

                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                />
              </Tooltip>
              <Typography on variant="h6" sx={{ marginTop: 1, fontSize: 15, fontWeight: "bold" }}                   onClick={() => navigate(`/files/${folder.id}`)} // Navigate to file screen
              >
                {folder.name}
              </Typography>
            </Grid>
          ))}

        </Grid>

      </Box>


    </ResponsiveDev>

  )

}

export default FileSharingHub;
