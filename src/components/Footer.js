import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import { useNavigate } from "react-router-dom";
import AboutUs from '../pages/Info/AboutUs';

function Footer() {
    const navigate = useNavigate(); // Hook for navigation
  
  return (
    <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      background: 'linear-gradient(to right, #6861bd, #3873d4, #22a9d3)',
      textAlign: 'center',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      gap: '10px',
    }}
  >
    {/* Copyright */}
    <Typography variant="body2">© 2025 Juniverse |</Typography>

    {/* Clickable About Us */}
    <Typography
      variant="body2"
      sx={{
        cursor: 'pointer',
      }}
      onClick={() => navigate('/AboutUs')}
    >
      About Us
    </Typography>

    <Typography variant="body2">|</Typography>

    {/* Clickable Contact Us */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <PhoneIcon sx={{ fontSize: 16, mr: 0.5 }} />
      <Typography variant="body2" sx={{ mt: '1px' }}>
        +962 790000000
      </Typography>
    </Box>

    <Typography variant="body2">|</Typography>

    {/* Clickable Instagram Link */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <a
        href="https://www.instagram.com/juniverse_ju_2025/" 
        target="_blank"
        style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}
      >
        <InstagramIcon sx={{ fontSize: 18, mr: 0.5 }} /> JUniVerse
      </a>
    </Box>
  </Box>

  )
}

export default Footer