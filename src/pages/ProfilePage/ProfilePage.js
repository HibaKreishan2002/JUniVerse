/* import React from "react";
import { Box, Typography, Avatar, Button, Grid } from "@mui/material";

const ProfilePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('/path-to-your-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        textAlign: "left",
        padding: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          width: "100%",
          textAlign: "left",
          mb: 4,
        }}
      >
        
        <Avatar sx={{ width: 60, height: 60, marginBottom: 5}} />
      
        <Typography variant="h5" fontWeight="bold">
          Rahaf Moatasem Saleem (student)
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Major:</strong> computer information systems.
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          <strong>Bio:</strong> write anything you want, a quote, a status or a message.
        </Typography>
      </Box>
      
      <Box sx={{ textAlign: "center", width: "100%", mt: 0 }}>
        <Typography variant="h6" fontWeight="bold">
          Hubs:
        </Typography>
        <Grid container spacing={2} justifyContent="center" mt={2} maxWidth={600} marginX="auto">
          {["Social Hub", "File Sharing Hub", "Mental Health Hub", "Help Hub", "News Hub", "E-Card Hub"].map((hub) => (
            <Grid item xs={6} sm={4} key={hub}>
              <Button variant="contained" sx={{ backgroundColor: "#d9e5f5", color: "black", width: "100%" }}>
                {hub}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage; */
import React, { useState, useEffect } from 'react' //useEffect we went to use (useEffect) to do something one time when the component opened (Ok)
import { Box, Grid, Stack, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, styled } from '@mui/material';
import CoverIMG from '../../assets/images/cover.png'
import ProfilePic from '../../assets/images/profile.jpg'
import { useNavigate } from 'react-router-dom';
import JuUniVerseAxios from '../../API/JuUniVerseAxios';
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function ProfilePage() {
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("Admin")
  const [userMajor, setUserMajor] = useState("Computer Science ")
  const [userBio, setUserBio] = useState("I love coding")
  const [refershPage, setRefershPage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef(undefined);
  const [formData, setFormData] = useState({
    bio: '',
    profilePic: "",
    coverPic: "",
    profilePicEx: "",
    coverPicEx: "",
  });
  const navigate = useNavigate()
  const handlePageNavigation = (hub) => {
    console.log(hub);

    if (hub == "Social Hub") {
      navigate("SocialHub");
    } else if (hub == "Mental Health Hub") {
      navigate("MentalHealthHub");
    } else if (hub == "News Hub") {
      navigate("News");
    } else if (hub == "File Sharing Hub") {
      navigate("FileSharing");
    } else if (hub == "E-Card Hub") {
      navigate("ECard");
    }
    else if (hub == "Help Hub") {
      navigate("HelpHub");
    }

  };
  useEffect(() => {
    //setRefershPage(refershPage+1)
    clearTimeout(timer.current);

    JuUniVerseAxios.get("/sys-user/profile").then(res => {

      setUserName(res.data.data.firstName + ' ' + res.data.data.lastName)
      setUserRole(res.data.data.role)
      setUserMajor(res.data.data.major)
      setUserBio(res.data.data.bio)
sessionStorage.setItem("fullname",res.data.data.firstName + ' ' + res.data.data.lastName)
    })

    JuUniVerseAxios.get("/sys-user/profile-and-cover-picture").then(res => {

      setFormData({ coverPic: res.data.data.coverPicturesBase64, coverPicEx: res.data.data.coverPicturesExtension, profilePic: res.data.data.profilePictureBase64, profilePicEx: res.data.data.profilePictureExtension })

    }).catch(err=>{
      
    })


  }, [refershPage])
  // Toggle the form visibility
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      console.log(file);
      setFormData((prevData) => ({
        ...prevData,
        [name == "profilePic" ? "profilePicEx" : "coverPicEx"]: file.type,
      }));
      convertToBase64(file, name);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    // height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    // width: 1,
  });
  // Handle form submission (profile update)
  const handleSubmit = (e) => {
    try {
      console.log(formData)

      e.preventDefault();

      JuUniVerseAxios.put("/sys-user/profile-picture", {
        photoAsBase64: formData?.profilePic, fileExtension: formData?.profilePicEx
      }).then(res => {

        setFormData({ profilePic: formData?.profilePic, profilePicEx: formData?.profilePicEx })
        setRefershPage(refershPage + 1)

      })
      JuUniVerseAxios.put("/sys-user/cover-picture", {
        photoAsBase64: formData?.coverPic, fileExtension: formData?.coverPicEx
      }).then(res => {

        setFormData({ coverPic: formData?.coverPic, coverPicEx: formData?.coverPicEx })
        setRefershPage(refershPage + 1)

      })

      if (formData.bio != undefined && formData.bio != "") {
        JuUniVerseAxios.put("/sys-user/bio", {
          bio: formData.bio
        }).then(res => {
          setRefershPage(refershPage + 1)


        })
      }
      // Here you can send the formData to the backend to update the profile.
      console.log('Profile Updated:', formData);
      setIsEditing(false);
    }
    catch {
      console.log(e);

    }

  };
  const handleClose = () => {
    setIsEditing(false);
    setRefershPage(refershPage + 1)

  };
  const convertToBase64 = (file, name) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader);

      setFormData((prevData) => ({
        ...prevData,
        [name]: reader.result.split(",")[1],
      }));
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      {/* COVER_PHOTO */}
      {/* <LinearProgress /> */}

      <Box sx={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(data:${formData.coverPicEx};base64,${formData.coverPic})`, height: '250px', margin: 0, padding: 0 }}>
      </Box>
      <Stack direction={'row'}>
        <Box>
          <img src={`data:${formData.profilePicEx};base64,${formData.profilePic}`} width={230} height={230} style={{ borderRadius: '150px', marginLeft: 70, marginTop: -100 }} />
        </Box>
        <Box>
          <Typography sx={{ margin: 2, fontWeight: 'bold', fontSize: 25 }} > {`${userName}`} {`(${userRole})`}</Typography>
          <Typography sx={{ marginTop: 0, fontSize: 15 }} > <b>Major:</b> {`${userMajor}`} </Typography>
          <Typography sx={{ marginTop: 0, fontSize: 15 }} > <b>Bio:</b>{`${userBio}`} </Typography>

        </Box>
        <div style={{ marginLeft: 'auto' }} >
          <Box sx={{ marginLeft: 'auto' }}>
            <Button
              variant="contained"
              sx={{
                margin: 2,
                width: '150px',
                height: '60px',
                backgroundColor: '#d9e5f5',
                color: 'black',
              }}
              onClick={handleEditClick}
            >
              <EditIcon /> Edit Profile
            </Button>
          </Box>

          {/* Modal for Editing Profile */}
          <Dialog open={isEditing} onClose={handleClose} >
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent sx={{width:'400px'}}>
              <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Bio"
                    variant="outlined"
                    fullWidth
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                  <Button sx={{ backgroundColor: '#d9e5f5', color: 'black', fontSize: '10px' }}
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Choose Photo

                    <VisuallyHiddenInput
                      type="file"
                      name="profilePic"
                      accept="image/*"
                      onChange={handleInputChange}

                    />

                  </Button>
                  <lable style={{ float: 'right' }}>Profile Photo</lable>
                </Box>


                <Box sx={{ marginBottom: 2 }}>
                  <Button sx={{ backgroundColor: '#d9e5f5', color: 'black', fontSize: '10px' }}
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    Choose Photo

                    <VisuallyHiddenInput
                      type="file"
                      name="coverPic"
                      accept="image/*"
                      onChange={handleInputChange}

                    />

                  </Button>
                  <lable style={{ float: 'right' }}>Cover Photo</lable>
                </Box>

                <DialogActions>
                  <Button type="submit" variant="contained" sx={{ backgroundColor: '#d9e5f5', color: 'black' }}>
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{ backgroundColor: '#f1f1f1', color: 'black' }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </Stack>
      <Typography sx={{ fontSize: 20, fontWeight: 'bold', marginLeft: 33 }} > Hubs: </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        marginTop={3}
        sx={{ gap: 1 }}
      >

        {["Social Hub", "File Sharing Hub", "Mental Health Hub", "Help Hub", "News Hub", "E-Card Hub"].map((hub, index) => (
          <Grid xs={3} key={index} display="flex" justifyContent="center" >
            <Button
              variant="contained"
              sx={{ margin: 2, width: "150px", height: "60px", backgroundColor: "#d9e5f5", color: "black" }}
              onClick={() => handlePageNavigation(hub)}
            >
              {hub}
            </Button>
          </Grid>
        ))}
      </Grid>




    </>
  )
}
export default ProfilePage;