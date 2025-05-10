import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import JuUniVerseAxios from '../../API/JuUniVerseAxios';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import Dashboard from "../../components/Dashboard";

function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("Admin");
  const [userMajor, setUserMajor] = useState("Computer Science ");
  const [userBio, setUserBio] = useState("I love coding");
  const [refershPage, setRefershPage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    profilePic: "",
    coverPic: "",
    profilePicEx: "",
    coverPicEx: "",
  });

  const timer = React.useRef(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    clearTimeout(timer.current);

    JuUniVerseAxios.get("/sys-user/profile").then(res => {
      setUserName(res.data.data.firstName + ' ' + res.data.data.lastName);
      setUserRole(res.data.data.role);
      setUserMajor(res.data.data.major);
      setUserBio(res.data.data.bio);
      sessionStorage.setItem("fullname", res.data.data.firstName + ' ' + res.data.data.lastName);
      sessionStorage.setItem("username", res.data.data.username);
      sessionStorage.setItem("role", res.data.data.role);
    });

    JuUniVerseAxios.get("/sys-user/profile-and-cover-picture").then(res => {
      setFormData({
        coverPic: res.data.data.coverPicturesBase64,
        coverPicEx: res.data.data.coverPicturesExtension,
        profilePic: res.data.data.profilePictureBase64,
        profilePicEx: res.data.data.profilePictureExtension
      });
    }).catch(err => {});
  }, [refershPage]);

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name === "profilePic" ? "profilePicEx" : "coverPicEx"]: file.type,
      }));
      convertToBase64(file, name);
    } else {
      if (name === "bio") {
          setUserBio(value);

        
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
   if (userBio) {
      JuUniVerseAxios.put("/sys-user/bio", {
        bio: formData.bio
      }).then(() =>{ setRefershPage(refershPage + 1)
    
        setIsEditing(false);}
);
    }else{
      return
    }
    JuUniVerseAxios.put("/sys-user/profile-picture", {
      photoAsBase64: formData?.profilePic,
      fileExtension: formData?.profilePicEx
    }).then(() => { setRefershPage(refershPage + 1)
    
        setIsEditing(false);});

    JuUniVerseAxios.put("/sys-user/cover-picture", {
      photoAsBase64: formData?.coverPic,
      fileExtension: formData?.coverPicEx
    }).then(() => { setRefershPage(refershPage + 1)
    
        setIsEditing(false);});

 

  };

  const handleClose = () => {
    setIsEditing(false);
    setRefershPage(refershPage + 1);
  };

  const convertToBase64 = (file, name) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: reader.result.split(",")[1],
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveProfilePic = () => {
    JuUniVerseAxios.delete("/sys-user/profile-picture").then(() => {
      setFormData(prev => ({ ...prev, profilePic: "" }));
      setRefershPage(refershPage + 1);
    });
  };

  const handleRemoveCoverPic = () => {
    JuUniVerseAxios.delete("/sys-user/cover-picture").then(() => {
      setFormData(prev => ({ ...prev, coverPic: "" }));
      setRefershPage(refershPage + 1);
    });
  };

  return (
    <>
      <Box sx={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(data:${formData.coverPicEx};base64,${formData.coverPic})`, height: '250px' }} />

      <Stack direction="row">
        <Box>
          <img
            src={`data:${formData.profilePicEx};base64,${formData.profilePic}`}
            width={230}
            height={230}
            style={{ borderRadius: '150px', marginLeft: 70, marginTop: -100 }}
          />
        </Box>
        <Box>
          <Typography sx={{ margin: 2, fontWeight: 'bold', fontSize: 25 }}>
            {`${userName}`} {`(${userRole})`}
          </Typography>
          <Typography sx={{ marginTop: 0, fontSize: 15 }}>
            <b>Major:</b> {`${userMajor}`}
          </Typography>
          <Typography sx={{ marginTop: 0, fontSize: 15 }}>
            <b>Bio:</b> {`${userBio}`}
          </Typography>
        </Box>
        <div style={{ marginLeft: 'auto' }}>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button
              variant="contained"
              sx={{
                margin: 2,
                width: '150px',
                height: '60px',
                
                backgroundColor: '#f6f6ff',
                color: 'black',
              }}
              onClick={handleEditClick}
            >
              <EditIcon /> Edit Profile
            </Button>
          </Box>

          <Dialog open={isEditing} onClose={handleClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent sx={{ width: '400px' }}>
              <form onSubmit={handleSubmit}>
                <br />
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    label="Bio"
                    variant="outlined"
                    fullWidth
                    name="bio"
                    value={userBio}
                    onChange={handleInputChange}
                    helperText={userBio?"":"Bio cannot be empty"}
                   error={userBio ? false : true}
                  />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                  <Button
                    sx={{ backgroundColor: '#d9e5f5', color: 'black', fontSize: '10px' }}
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
                  <label style={{ float: 'right' }}>Profile Photo</label>
                  <Button
                    sx={{ fontSize: '10px', marginLeft: '8px' }}
                    variant="contained"
                    component="label"
                    color="error"
                    startIcon={<CloseIcon />}
                    onClick={handleRemoveProfilePic}
                  >
                    Remove
                  </Button>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Button
                    sx={{ backgroundColor: '#d9e5f5', color: 'black', fontSize: '10px' }}
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
                  <Button
                    sx={{ fontSize: '10px', marginLeft: '8px' }}
                    variant="contained"
                    component="label"
                    color="error"
                    startIcon={<CloseIcon />}
                    onClick={handleRemoveCoverPic}
                  >
                    Remove
                  </Button>
                  <label style={{ float: 'right' }}>Cover Photo</label>
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

      <Dashboard />
    </>
  );
}

export default ProfilePage;
