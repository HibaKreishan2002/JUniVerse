import React, { useState, useEffect } from "react";
import ResponsiveDev from "../../components/ResponsiveDev";
import FolderIcon from '@mui/icons-material/Folder';
import JuUniVerseAxios from "../../API/JuUniVerseAxios";
import { Morveret, Box, Grid, Stack, Tooltip, Typography, Button, IconButton, TextField, tooltipClasses, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, styled, Modal, Badge, Alert } from '@mui/material';
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
import FileViewer from 'react-file-viewer';











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

    function FileScreen() {
  const { folderId } = useParams(); // Get folderId from URL
  const [fileName, setFileName] = useState("")
  const [base64File, setBase64File] = useState("")
  const [fileDetails, setFileDetails] = useState([]);
  const [menuData, setMenuData] = useState({ anchorEl: null, selectedMsg: null });
  const [hovered, setHovered] = useState(null);
  const [modelTitle, setModelTitle] = useState("");
  const [fileExtension, setFileExtension] = useState("")
  const [fileID, setFileID] = useState(0);
  const [fileDescription, setFileDescription] = useState(" ");
  const [refershPage, setRefershPage] = useState(0);
  const [openViewer, setOpenViewer] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenViewer = () => setOpenViewer(true);
const handleClose = () => {
  setErrorMessage("");
  setBase64File("");
  setBase64FileContent("");
  setFileName("");
  setFileDescription(" ");
  setFileExtension("");
  setFileID(0);
  setOpen(false);
};
  const [base64FileContent, setBase64FileContent] = useState("")
  const [base64FileExtension, setBase64FileExtension] = useState("")
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    JuUniVerseAxios.get(`/files/${folderId}`).then((res) => {

      console.log(res.data.data);
      setFileDetails(res.data.data)
    }).catch((err) => {

    })
  }, [refershPage])

  //EDIT
  const handleEditFile=()=>{

    JuUniVerseAxios.put(`files/file/${fileID}/name?fileName=${fileName}`, { name: fileName, description: fileDescription }).then((res) => {
      setRefershPage(refershPage + 1);
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success"
      });
      setFileDescription(" ");
      setFileName("");
      setOpen(false)
    }).catch(err=>{console.log(err?.response?.data?.errorDescription)
  
        Swal.fire({
            title: "ERROR",
            text: err?.response?.data?.errorDescription,
            icon: "error"
          });
          handleClose();
  
    }
    )

    JuUniVerseAxios.put(`files/file/${fileID}/description?fileDescription=${fileDescription}`, { name: fileName, description: fileDescription }).then((res) => {
      setRefershPage(refershPage + 1);
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success"
      });
      setFileDescription(" ");
      setFileName("");
      setOpen(false)
    }).catch(err=>{console.log(err?.response?.data?.errorDescription)
  
        Swal.fire({
            title: "ERROR",
            text: err?.response?.data?.errorDescription,
            icon: "error"
          });
          handleClose();
  
    }
    )
  }
const mimeTypes = {
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        xls: "application/vnd.ms-excel",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ppt: "application/vnd.ms-powerpoint",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        css: "text/css",
        html: "text/html",
        txt: "text/html",
        php: "application/x-httpd-php",
        java: "text/x-java-source",
        mp4: "video/mp4",
        mp3: "audio/mpeg",
        js: "application/javascript",
        mpeg: "video/mpeg",
      };
  const convertToBase64 = async (file, name) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      console.log(reader.result);
      const Base64 = reader.result.split(",")[1];
      setFileName(file.name);
      setBase64File(Base64)
      const fileExtensionBase = file.name.split(".");
      setFileExtension( fileExtensionBase[fileExtensionBase.length - 1])
      console.log(fileExtensionBase[fileExtensionBase.length - 1]);

    }
      ;
      console.log(file);
      if(file){

        reader.readAsDataURL(file);
      }
  };
  const handleInputChange = (e) => {
    
    const { name, value, files } = e?.target;

    if (files) {
      const file = files[0];
   const mimeType = mimeTypes[file.name.split(".")[file.name.split(".").length-1].toLowerCase()];
      if (!mimeType) {
                  setOpen(false);

        Swal.fire({
          title: `Unsupported file type!`,
          icon: "error",

          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: "OK"


        })
          ; return;
      }
      const base64 = convertToBase64(file, name);



    };

  }
  const AddFile = (name, type, base64) => {
    
              if (modelTitle !== "Edit File"&&(fileExtension==undefined || fileExtension.trim()=="")){

     
      setErrorMessage("Please Select the file first !")

      return;
    }
      if (fileName==undefined || fileName.trim()==""){

     
      setErrorMessage("Please fill File Name")

      return;
    }
       if (fileDescription==undefined || fileDescription.trim()==""){

     
      setErrorMessage("Please fill File Description")

      return;
    }

 
    if (modelTitle === "Upload File") {
      JuUniVerseAxios.post("/files", {
        name: fileName,
        extension: type,
        description: fileDescription,
        folderId: folderId,
        fileAsBase64: base64,
      })
        .then((res) => {
          setRefershPage(refershPage + 1);
  
          if (
            sessionStorage.getItem("role") == "STUDENT" 
          ) {
            Swal.fire("Your file is being moderated!");
          }
  
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      handleEditFile();
    }
  };
  
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
  const getFileByID = (fileID, transition) => {
    JuUniVerseAxios.get(`/files/file/${fileID}`).then(res => {
      console.log(res)
      setBase64FileContent(res.data.data.fileAsBase64)
      setBase64FileExtension(res.data.data.extension)
      if (transition == "Download") {
        handleDownload(res.data.data.fileAsBase64, "JuUnFile", res.data.data.extension)
      } else {

        handleView(res.data.data.fileAsBase64, res.data.data.extension)
      }
    })
      .catch(err => {

      })
  }
  const getFileUrl = (base64, fileType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: `audio/${fileType}` });
    return URL.createObjectURL(blob);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleView = (base64FileContent, fileExtension) => {
    const mimeTypes = {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xls: "application/vnd.ms-excel",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ppt: "application/vnd.ms-powerpoint",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      css: "text/css",
      html: "text/html",
      txt: "text/html",
      php: "application/x-httpd-php",
      java: "text/x-java-source",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      js: "application/javascript",
      mpeg: "video/mpeg",
    };

    const mimeType = mimeTypes[fileExtension.toLowerCase()];
    if (!mimeType) {
      alert("Unsupported file type");
      return;
    }

    // Convert Base64 to binary
    const byteCharacters = atob(base64FileContent);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Create object URL and open in new tab
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  const handleDownload = (base64FileContent, fileName, fileExtension) => {
    const mimeTypes = {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      xls: "application/vnd.ms-excel",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ppt: "application/vnd.ms-powerpoint",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      pdf: "application/pdf",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      css: "text/css",
      html: "text/html",
      txt: "text/plain",  // Fixed incorrect MIME type
      php: "application/x-httpd-php",
      java: "text/x-java-source",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      js: "application/javascript",
      mpeg: "video/mpeg",
    };

    const mimeType = mimeTypes[fileExtension.toLowerCase()];
    if (!mimeType) {
      alert("Unsupported file type");
      return;
    }

    // Convert Base64 to binary
    const byteCharacters = atob(base64FileContent);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Create object URL
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor tag to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${fileExtension}`; // Set filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the object URL to free memory
    URL.revokeObjectURL(url);
  };
  return (

    <ResponsiveDev>

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
          
            <Typography variant="h6" mb={2}>{modelTitle}<FolderIcon sx={{ fontSize: 28, color: "#ffd35a", position: "relative", top: 10 }} />
                     {errorMessage!=""?            <Alert severity="error">{errorMessage}</Alert>:""}

            </Typography>
            {  modelTitle==="Upload File"?
        <Button sx={{ float: "right" }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
    
          startIcon={<CloudUploadIcon />}
        >
          Choose file
       <VisuallyHiddenInput
            type="file"
              accept={Object.keys(mimeTypes).map(ext => "." + ext).join(",")}

            onChange={handleInputChange}

          /> 
        </Button>:""}
            <TextField fullWidth label="File Name" variant="outlined" margin="normal" value={fileName}
              onChange={(e) => setFileName(e.target.value)} />
            <TextField fullWidth label="File Description" variant="outlined" margin="normal" value={fileDescription}
              onChange={(e) => setFileDescription(e.target.value)} />
            <Box mt={2} display="flex" gap={2}>
              <Button variant="contained" color="primary" onClick={()=>AddFile(fileName, fileExtension, base64File)}>
                SAVE
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                CANCEL
              </Button>
            </Box>
          </Box>
        </Modal>
      <Box sx={{
        float: "right"

      }}>

        <Button sx={{ float: "right" }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          onClick={()=>{
            setModelTitle("Upload File")
            setFileName("");
            setFileDescription(" ");

            setOpen(true)}}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          {/* <VisuallyHiddenInput
            type="file"
            onChange={handleInputChange}

          /> */}
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
                PaperProps={{
                  sx: {
                    boxShadow: 'none', // Remove shadow from the Paper component
                    border: '1px solid #ccc', // Add border (change color as needed)
                    borderRadius: '5px', // Optional: add rounded corners
                  }
                }}
              >
          
                   {(sessionStorage.getItem("role") == "ADMIN" ) ||( sessionStorage.getItem("role") == "MODERATOR" )?(
               <> 
               <MenuItem onClick={() => {
                  setModelTitle("Edit File")
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
                    title: ` Do you want to Delete "${menuData.selectedMsg?.name}" File? `,
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
                }}>Delete</MenuItem> </>

):""} 

        
                <MenuItem onClick={() => {

                  setFileID(menuData.selectedMsg?.id)
                  getFileByID(menuData.selectedMsg?.id)

                  setMenuData({ anchorEl: null });
                  console.log(menuData.selectedMsg);
                  // setOpenViewer(true)
                }}>View</MenuItem>
                <MenuItem onClick={() => {

                  setFileID(menuData.selectedMsg?.id)
                  getFileByID(menuData.selectedMsg?.id, "Download")

                  setMenuData({ anchorEl: null });
                  console.log(menuData.selectedMsg);
                  // setOpenViewer(true)
                }}>Download</MenuItem>
              </Menu>
              <Tooltip title={ `  Uploaded By : ${file.ownerUsername}`} placement="top" arrow

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
                  <Tooltip title={`Description: ${file.description}` } placement="bottom" arrow

                slotProps={{
                  popper: {
                    sx: {
                      [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                      {
                        marginTop: '33px',
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
              </Tooltip>
              <Typography variant="h6" sx={{ marginTop: 1, fontSize: 15, fontWeight: "bold" }}>
                {file.name}
              </Typography>
            </Grid>
          ))}

        </Grid>

      </Box>
      <Modal
        open={openViewer}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button onClick={handleView} className="text-blue-500 mr-4">
            View
          </button>
          <FileViewer fileType={base64FileExtension} filePath={getFileUrl(base64FileContent, "m4a")} />

        </Box>
      </Modal>
    </ResponsiveDev>
  );
    }

  export default FileScreen; 
