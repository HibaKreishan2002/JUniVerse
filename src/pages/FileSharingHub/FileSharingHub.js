import React, { useState, useEffect } from "react";
import ResponsiveDev from "../../components/ResponsiveDev";
import FolderIcon from '@mui/icons-material/Folder';
import JuUniVerseAxios from "../../API/JuUniVerseAxios";
import { Box, Grid, Stack,Tooltip, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, styled, Modal } from '@mui/material';
import { Label } from "@mui/icons-material";



function FileSharingHub() {
  const [folderDetails, setFolderDetails] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [refershPage,setRefershPage]=useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    JuUniVerseAxios.get("/folder").then((res) => {
      setFolderDetails(res?.data?.data)
    })
  }, [refershPage])

  const addFolder = () => {
    JuUniVerseAxios.post("/folder",{name:folderName , description:folderDescription}).then((res) => {
      setRefershPage(refershPage+1);
      setFolderDescription("");
      setFolderName("");
      handleClose();
    })

  }


  return (
    <>
      <Box sx={{
        float: "right", margin: "23px",
      }}>

        <Button variant={'contained'} sx={{ fontWeight: 'bold' }} onClick={handleOpen} >
          Add Folder

        </Button>
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
            }}
          >
            <Typography variant="h6" mb={2}>Create Folder <FolderIcon sx={{ fontSize: 33, color: "#ffd35a", position: "relative", top: 10 }} />

            </Typography>
            <TextField fullWidth label="Folder Name" variant="outlined" margin="normal" value={folderName}
              onChange={(e) => setFolderName(e.target.value)} />
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        height: "85vh"
      }}>
        <Grid container
          justifyContent="center"
          alignItems="center"
          rowSpacing={4}
        >
          {/* {folderDetails.map((folder) => (
            <>
              <Grid
                item xs={4}
                
                display="flex"
                flexDirection={'column'}
                justifyContent="center" key={folder}>
                <FolderIcon sx={{ fontSize: 180, color: "#ffd35a" }} />
                <label>{folder.name}</label>
              </Grid>

            </>
          ))} */}
          {folderDetails.map((folder, index) => (
        <Grid
          item
          xs={4}
          key={index}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Tooltip title={folder.description} placement="top" arrow>
            <FolderIcon
              sx={{
                fontSize: 180,
                color: "#ffd35a",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            />
          </Tooltip>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {folder.name}
          </Typography>
        </Grid>
      ))}

        </Grid>

      </Box>


    </>

  )

}

export default FileSharingHub;
