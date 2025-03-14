
import React, { useState, useEffect } from "react";
import ResponsiveDev from "../../components/ResponsiveDev";
import FolderIcon from '@mui/icons-material/Folder';
import JuUniVerseAxios from "../../API/JuUniVerseAxios";
import { Morveret, Box, Grid, Stack, Tooltip, Typography, Button, IconButton, TextField, tooltipClasses, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, styled, Modal } from '@mui/material';
import { useParams } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";
import pdficon from '../../assets/images/pdficon.png'
import ImageIcon from '@mui/icons-material/Image';
import wordicon from '../../assets/images/wordicon.png'
import powerpointicon from '../../assets/images/powerpointicon.png'
import jsicon from '../../assets/images/jsicon.png'
import excelicon from '../../assets/images/excelicon.png'
import texticon from '../../assets/images/texticon.png'
import mp4icon from '../../assets/images/mp4icon.png'
import mp3icon from '../../assets/images/mp3icon.png'
import javaicon from '../../assets/images/javaicon.png'
import htmlicon from '../../assets/images/htmlicon.png'
import cssicon from '../../assets/images/cssicon.png'
import phpicon from '../../assets/images/phpicon.png'
import FileIcon from '@mui/icons-material/InsertDriveFile';












const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function FileScreen() {
  const { folderId } = useParams(); // Get folderId from URL
  const [fileName, setFileName] = useState("")
  const [base64File, setBase64File] = useState("")
  const [fileDetails, setFileDetails] = useState([]);
  const [menuData, setMenuData] = useState({ anchorEl: null, selectedMsg: null });
  const [hovered, setHovered] = useState(null);
  const [modelTitle, setModelTitle] = useState("Create Folder");
  const [fileExtension, setFileExtension] = useState("")
  const [fileID, setFileID] = useState(0);
  const [fileDescription, setFileDescription] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [refershPage, setRefershPage] = useState(0);






  useEffect(() => {
    JuUniVerseAxios.get(`/files/${folderId}`).then((res) => {

      console.log(res.data.data);
      setFileDetails(res.data.data)
    }).catch((err) => {

    })
  }, [refershPage])
  const convertToBase64 = async (file, name) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      console.log(reader.result);
      const Base64 = reader.result.split(",")[1];
      setFileName(file.name);
      setFileExtension(file.type)
      setBase64File(reader.result)
      const fileExtensionBase = file.name.split(".");
      console.log(fileExtensionBase[fileExtensionBase.length - 1]);

      AddFile(file.name, fileExtensionBase[fileExtensionBase.length - 1], Base64)
    }
      ;
    reader.readAsDataURL(file);
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      console.log(file);

      const base64 = convertToBase64(file, name);



    };

  }
  const AddFile = (name, type, base64) => {
    JuUniVerseAxios.post("/files", { name: name, extension: type, description: " ", folderId: folderId, fileAsBase64: base64 }).then((res) => {


    }).catch((err) => {
      console.log(err);

    })
  }
  const handleMenuClose = () => {
    setMenuData({ anchorEl: null, selectedMsg: null });
  };
  const handleClick = (event, file) => {
    setMenuData({ anchorEl: event.currentTarget, selectedMsg: file });
  };
  const handleDeletedFiles = (id) => {
    JuUniVerseAxios.delete(`files/file/${id}`).then(res => {
      setRefershPage(refershPage + 1); // Refresh chat
      return (Swal.fire("Deleted!", "", "success"))

    })
      .catch((error) => {
        console.log(error);
        //

        return (Swal.fire(error?.response?.data?.errorDescription, "", "error"))

      });

  }


  return (

    <ResponsiveDev>

      <Box sx={{
        float: "right"

      }}>

        <Button sx={{ float: "right" }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={handleInputChange}

          />
        </Button>
      </Box>
      {/* <img src={pdficon} width={'133px'}/> */}
      <Box sx={{



      }}>
        <Grid container
          justifyContent="center"
          alignItems="center"
          rowSpacing={4}
          columnSpacing={15}
          sx={{ WebkitBoxPack: 'unset', WebkitJustifyContent: "start" }}

        >

          {fileDetails.map((file, index) => (
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
              sx={{ WebkitBoxPack: 'unset', WebkitJustifyContent: "start" }}

            >
              <IconButton onClick={(e) => handleClick(e, file)} sx={{ ml: 15, paddingBottom: 0 }}  >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={menuData.anchorEl}
                open={Boolean(menuData.anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => {
                  setModelTitle("Edit Folder")
                  setFileID(menuData.selectedMsg?.id)
                  setFileName(menuData.selectedMsg?.name);
                  setFileDescription(menuData.selectedMsg?.description);
                  handleOpen();
                  setMenuData({ anchorEl: null });
                  console.log(menuData.selectedMsg);

                }}>Edit</MenuItem>
                <MenuItem onClick={() => {

                  setMenuData({ anchorEl: null });
                  Swal.fire({
                    title: ` Do you want to Delete "${menuData.selectedMsg?.name}" Folder? `,
                    showCancelButton: true,
                    showDenyButton: true,
                    showConfirmButton: false,
                    denyButtonText: `Delete`


                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isDenied) {
                      handleDeletedFiles(menuData.selectedMsg?.id)

                    }
                  });
                }}>Delete</MenuItem>
              </Menu>
              <Tooltip title={file.description} placement="top" arrow

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
                {file.extension == "pdf" ? <img src={pdficon} width={'70px'} />
                  : file.extension == "png" || file.extension == "jpg" || file.extension == "jpeg" ? <ImageIcon sx={{ fontSize: 75, color: "#247dd1" }} />
                    : file.extension == "doc" || file.extension == "docx" ? <img src={wordicon} width={'70px'} />
                      : file.extension == "ppt" || file.extension == "pptx" ? <img src={powerpointicon} width={'70px'} />
                        : file.extension == "xls" || file.extension == "xlsx" ? <img src={excelicon} width={'70x'} />
                          : file.extension == "js" ? <img src={jsicon} width={'70px'} />
                            : file.extension == "txt" ? <img src={texticon} width={'70px'} />
                              : file.extension == "mp4" ? <img src={mp4icon} width={'70px'} />
                                : file.extension == "mp3" ? <img src={mp3icon} width={'70px'} />
                                  : file.extension == "java" ? <img src={javaicon} width={'70px'} />
                                    : file.extension == "php" ? <img src={phpicon} width={'70px'} />
                                      : file.extension == "html" ? <img src={htmlicon} width={'70px'} />
                                        : file.extension == "css" ? <img src={cssicon} width={'70px'} />
                                          : <FileIcon
                                            sx={{
                                              fontSize: 75,
                                              padding: 0,
                                              margin: '-32px',
                                              color: "#ffd35a",
                                              transition: "0.3s",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => navigate(`/files/${file.id}`)} // Navigate to file screen

                                            onMouseEnter={() => setHovered(index)}
                                            onMouseLeave={() => setHovered(null)}
                                          />}

              </Tooltip>
              <Typography variant="h6" sx={{ marginTop: 1, fontSize: 15, fontWeight: "bold" }}>
                {file.name}
              </Typography>
            </Grid>
          ))}

        </Grid>

      </Box>
    </ResponsiveDev>
  );
}
