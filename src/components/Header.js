// import React,{useState} from 'react';
// // import AppBar from '@mui/material/AppBar';
// // import Box from '@mui/material/Box';
// // import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// // import Button from '@mui/material/Button';
// // import Menu from '@mui/material/Menu';
// // import MenuItem from '@mui/material/MenuItem';
// // import IconButton from '@mui/material/IconButton';
//  import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
//  import WhiteLogo from '../assets/images/WhiteLogo.png';
//  import Text from '../assets/images/Text.png';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// import { useNavigate } from 'react-router-dom';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

//  function Header() {
//   const [MenuList, setMenuList] = useState("");
// const navigate=useNavigate();
//   // List of hubs to display in the header
//   const hubs = ['Soical', 'Mental Health', 'News', 'File Sharing', 'E-Card'];

//   // Open dropdown menu
//   const handleClick = (event) => {
//     console.log(event.currentTarget);

//     setMenuList(event.currentTarget);
//   };

//   // Close dropdown menu
//   const handleClose = (buttonName) => {

//     setMenuList(null);
//     if (buttonName=="Logout"){
//       navigate("/Login")
//     }
//   };
// //Handle Page navigation
// const handlePageNavigation=(hub)=>{
//   if(hub=="Soical"){
//     navigate("SocialHub")

//   }else if (hub=="Mental Health"){
//     navigate("MentalHealthHub")

//   }else if (hub=="News"){
//     navigate("News")

//   }else if (hub=="File Sharing"){
//     navigate("FileSharing")

//   }else if (hub=="E-Card"){
//     navigate("ECard")

//   }
// }
// const [anchorElNav, setAnchorElNav] = React.useState(null);
// const [anchorElUser, setAnchorElUser] = React.useState(null);

// const handleOpenNavMenu = (event) => {
//   setAnchorElNav(event.currentTarget);
// };
// const handleOpenUserMenu = (event) => {
//   setAnchorElUser(event.currentTarget);
// };

// const handleCloseNavMenu = () => {
//   setAnchorElNav(null);
// };

// const handleCloseUserMenu = () => {
//   setAnchorElUser(null);
// };
//   return (
//     <>
//    <AppBar position="static" sx={{    background: 'linear-gradient(to right, #6861bd, #3873d4,#22a9d3)' // Gradient background
//    }}>
//       <Container maxWidth="xl">

//  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

//           <img src={WhiteLogo} width={'55px'} height={'55px'} />
//           <img src={Text} width={'120px'} height={'15px'} style={{marginLeft:10}} />
//           {/* <Typography  sx={{marginLeft:2, fontWeight:'bold'}}>JU Univese</Typography> */}
//                   {/* Center the hubs in the toolbar with larger font and spacing */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
//             {hubs.map((hub, index) => (
//               <Button
//                 key={index}
//                 color="inherit"
//                 onClick={()=>handlePageNavigation(hub)}
//                 sx={{
//                   fontSize: '16px', // Increase font size
//                   marginLeft: '20px', // Add space between buttons
//                   marginRight: '20px', // Add space between buttons
//                   textTransform: 'none' // Prevent uppercase styling
//                 }}
//               >
//                 {hub}
//               </Button>
//             ))}
//           </Box>

//           {/* Account and Dropdown Icon */}
//           <IconButton color="inherit" onClick={handleClick}>
//             <AccountCircleOutlinedIcon sx={{ color: 'white', fontSize: '2.2rem' }} />
//             <KeyboardArrowDownOutlinedIcon sx={{ color: 'white', fontSize: '2.2rem' }} />
//           </IconButton>

//           {/* Dropdown Menu */}
//           <Menu
//             open={Boolean(MenuList)}
//             anchorEl={MenuList}
//             onClose={()=>handleClose()}
//           >
//             <MenuItem onClick={()=>handleClose}>Username</MenuItem>
//             <MenuItem onClick={()=>handleClose}>Help</MenuItem>
//             <MenuItem onClick={()=>handleClose("Logout")}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>

//       </Container>
//     </AppBar>

//    </>
//   );
// }
// export default Header;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Text from '../assets/images/Text.png';
import MenuItem from "@mui/material/MenuItem";
import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Button,
} from "@mui/material";

import { drawerWidth } from "./ProjectLayout";
import WhiteLogo from "../assets/images/WhiteLogo.png";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  background: "linear-gradient(to right, #6861bd, #3873d4,#22a9d3)",
  color: "#333333",
  [theme.breakpoints.up("sm")]: {
    width: `calc(100% - ${drawerWidth}px)`,
    flexShrink: 0,
  },
}));
const hubs = ["Soical", "Mental Health", "News", "File Sharing", "E-Card"];
// //Handle Page navigation

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignContent: "flex-start",
  alignItems: "center",
}));

const ContainerStyle = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.5),
  gridAutoFlow: "column",
}));

const MainHeader = (props) => {
  const [showLang, setShowLang] = useState(null);
  const [showNotification, setShowNotification] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(null);
  const navigate = useNavigate();
  const handlePageNavigation = (hub) => {
    if (hub == "Soical") {
      navigate("SocialHub");
    } else if (hub == "Mental Health") {
      navigate("MentalHealthHub");
    } else if (hub == "News") {
      navigate("News");
    } else if (hub == "File Sharing") {
      navigate("FileSharing");
    } else if (hub == "E-Card") {
      navigate("ECard");
    }
  };
  const [MenuList, setMenuList] = useState("");

  const handleClick = (event) => {
    console.log(event.currentTarget);

    setMenuList(event.currentTarget);
  };
  //   // Close dropdown menu
  const handleClose = (buttonName) => {
    setMenuList(null);
    if (buttonName == "Logout") {
      navigate("/Login");
    }
  };

  return (
    <AppBarStyle position="fixed">
      <ToolbarStyle>
        {/* Left side's items */}
        <ContainerStyle>
          <img src={WhiteLogo} width={"50px"} height={"50px"} style={{marginLeft:15}} />
          <img src={Text} width={'82px'} height={'15px'} style={{marginLeft:8,marginTop:18}} />

        </ContainerStyle>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            color: "white",
            flexWrap: "wrap", // Allow buttons to wrap on smaller screens
          }}
        >
          {hubs.map((hub, index) => (
            <Button
              key={index}
              color="inherit"
              onClick={() => handlePageNavigation(hub)}
              sx={{
                fontSize: "16px", // Increase font size
                marginLeft: "20px", // Add space between buttons
                marginRight: "20px", // Add space between buttons
                textTransform: "none", // Prevent uppercase styling
                // Make button size responsive
                "@media (max-width:600px)": {
                  fontSize: "14px", // Adjust font size on small screens
                  marginLeft: "10px", // Reduce spacing on small screens
                  marginRight: "10px", // Reduce spacing on small screens
                },
              }}
            >
              {hub}
            </Button>
          ))}
        </Box>

        {/* Right side's items */}
        <ContainerStyle>
          {/* Account and Dropdown Icon */}
          <IconButton color="inherit" onClick={handleClick}>
            <AccountCircleOutlinedIcon
              sx={{ color: "white", fontSize: "2.2rem" }}
            />
            <KeyboardArrowDownOutlinedIcon
              sx={{ color: "white", fontSize: "2.2rem" }}
            />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            open={Boolean(MenuList)}
            anchorEl={MenuList}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() => handleClose}>Username</MenuItem>
            <MenuItem onClick={() => handleClose}>Help</MenuItem>
            <MenuItem onClick={() => handleClose("Logout")}>Logout</MenuItem>
          </Menu>
        </ContainerStyle>
      </ToolbarStyle>
    </AppBarStyle>
  );
};

export default MainHeader;
