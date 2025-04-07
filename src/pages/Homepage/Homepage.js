import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import video from '../../assets/video.mp4'; // Correct import path
import WhiteLogo from "../../assets/images/WhiteLogo.png";
import Text from "../../assets/images/Text.png";
import Footer from '../../components/Footer';


function Homepage() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <video
        src={video}
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Header */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          width: '100%',
  background: "linear-gradient(to right, #6861bd, #3873d4,#22a9d3)",
                    color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
        }}
      >
        <Box  sx={{display: 'flex',
    alignItems: 'center', // Aligns logo and text vertically
    gap: '10px',}}   // Adds space between logo and text
   > 
        {/* Left - Logo */}
        <img src={WhiteLogo} width={"35px"} height={"35px"} style={{}} />
        <img src={Text} width={'85px'} height={'13px'} style={{}} />
        </Box>
        {/* Right - Login Button */}
        <Button
          sx={{ color: 'white', fontWeight: 'bold', border: '1px solid white' }}
          onClick={() => navigate('/Login')}
        >
        
          LOGIN
        </Button>
      </Box>

      {/* Footer */}
     <Footer/>
      
    </div>
  );
}

export default Homepage;
