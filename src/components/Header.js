// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import{ Menu, Modal, Typography , MenuItemfrom,  AppBar, Box, IconButton, styled, Toolbar, Button,MenuItem} from "@mui/material";
// import Text from "../assets/images/Text.png";
// import { drawerWidth } from "./Layout";
// import WhiteLogo from "../assets/images/WhiteLogo.png";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import GroupButtons from "./GroupButtons";



// const AppBarStyle = styled(AppBar)(({ theme }) => ({
//   boxShadow: "none",
//   backdropFilter: "blur(6px)",
//   background: "linear-gradient(to right, #6861bd, #3873d4,#22a9d3)",
//   color: "#333333",
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(100% - ${drawerWidth}px)`, 
//     flexShrink: 0,
//   },
// }));

// const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "space-between",
//   alignContent: "flex-start",
//   alignItems: "center",
// }));

// const ContainerStyle = styled(Box)(({ theme }) => ({
//   display: "grid",
//   gap: theme.spacing(0.5),
//   gridAutoFlow: "column",
// }));

// const MainHeader = () => {
//   const [showUserMenu, setShowUserMenu] = useState(null);
//   const [hubs, setHubs] = useState([]);
//   const navigate = useNavigate();

//   const [openHelpModal, setOpenHelpModal] = useState(false);
  

//   // Update menu based on user role
//   useEffect(() => {
//     setTimeout(() => {
  
//       const role = sessionStorage.getItem("role");
//       if (role === "THERAPIST") {
//         setHubs(["Soical", "Mental Health", "News", "E-Card", "Therapist","Notes"]);
//       } 
//       else if (role=="MODERATOR") 
//         { setHubs (["Soical", "Mental Health", "News", "File Sharing", "E-Card", "Files Management"])}
//       else if (role=="ADMIN") 
//         { setHubs (["Soical", "Mental Health", "News", "File Sharing", "E-Card", "Management"] )}
//     else  {
//         setHubs(["Soical", "Mental Health", "News", "File Sharing", "E-Card"]);
//       }
//     }, 200);
//   }, [sessionStorage.getItem("role")]); // Updates when role changes

//   const handlePageNavigation = (hub) => {
//     switch (hub) {
//       case "Soical":
//         navigate("SocialHub");
//         break;
//       case "Mental Health":
//         navigate("MentalHealthHub");
//         break;
//       case "News":
//         navigate("News");
//         break;
//         case "News Management":
//           navigate("NewsManagement");
//           break;
//       case "File Sharing":
//         navigate("FileSharing");
//         break;
//       case "E-Card":
//         navigate("ECard");
//         break;
//       case "Therapist":
//         navigate("TherapistChats");
//         break;
//         case "Notes":
//           navigate("TherapistNotes");
//           break;

//         case "Files Management":
//           navigate("FilesManagement")
//           break;
        
//         case "Students":
//           navigate("Students")
//           break;

//           case "Moderators":
//           navigate("Moderators")
//           break;
//       default:
//         break;
//     }
//   };

//   const handleOpenUserMenu = (event) => {
//     setShowUserMenu(event.currentTarget);
//   };

//   const handleCloseUserMenu = (buttonName) => {
//     setShowUserMenu(null);
//     if (buttonName === "Logout") {
//       sessionStorage.clear();
//       navigate("/");
//     }
//   };

//   return (
//     <AppBarStyle position="fixed">
//       <ToolbarStyle>
//         {/* Left side items */}
//         <ContainerStyle onClick={() => navigate("/Home")}>
//           <img src={WhiteLogo} width={"40px"} height={"40px"} style={{ marginLeft: 15 }} />
//           <img src={Text} width={"90px"} height={"15px"} style={{ marginLeft: 5, marginTop: 18 }} />
//         </ContainerStyle>

//         {/* Navigation Links */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             flexGrow: 1,
//             color: "white",
//             flexWrap: "wrap", // Allow buttons to wrap on smaller screens
//           }}
//         >
//           {hubs.map((hub, index) => (
//             <Button
//               key={index}
//               color="inherit"
//               onClick={() => handlePageNavigation(hub)}
//               sx={{
//                 fontSize: "16px",
//                 marginLeft: "20px",
//                 marginRight: "20px",
//                 textTransform: "none",
//                 "@media (max-width:600px)": {
//                   fontSize: "14px",
//                   marginLeft: "10px",
//                   marginRight: "10px",
//                 },
//               }}
//             >
//               {hub}
//             </Button>
//           ))}
//         </Box>

//         {/* Right side items (User Menu) */}
//         <ContainerStyle>
//           <IconButton color="inherit" onClick={handleOpenUserMenu}>
//             <AccountCircleOutlinedIcon sx={{ color: "white", fontSize: "2.2rem" }} />
//             <KeyboardArrowDownOutlinedIcon sx={{ color: "white", fontSize: "2.2rem" }} />
//           </IconButton>

//           {/* Dropdown Menu */}
//           <Menu
//             open={Boolean(showUserMenu)}
//             anchorEl={showUserMenu}
//             onClose={handleCloseUserMenu}
//           >
//             <MenuItem onClick={() => { navigate("/ProfilePage"); handleCloseUserMenu(); }}>
//               {sessionStorage.getItem("fullname")}
//             </MenuItem>
//             <MenuItem onClick={() => {
// setOpenHelpModal(true)
// handleCloseUserMenu()
//             }}>Help</MenuItem>
//             <MenuItem onClick={() => handleCloseUserMenu("Logout")}>Logout</MenuItem>
//           </Menu>
//         </ContainerStyle>
//       </ToolbarStyle>
//       <Modal
//   open={openHelpModal}
//   onClose={() => setOpenHelpModal(false)}
//   aria-labelledby="help-modal-title"
//   aria-describedby="help-modal-description"
// >
//   <Box
//     sx={{
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       width: 400,
//       bgcolor: 'background.paper',
//       borderRadius: 2,
//       boxShadow: 24,
//       p: 4,
//     }}
//   >
//     <Typography id="help-modal-title" variant="h6" component="h2" sx={{textAlign:"center" , fontWeight:"bold"}}>
// Need Help?    </Typography>
//     <Typography id="help-modal-description" sx={{ mt: 2 }}>
//     For assistance, please contact us at 
//     <br/> 
//     <a href="mailto:help@juniverse.com">help@juniverse.com.  </a>
//     <br/> 
// Our support team wil get back to you as soon as possible.
//       </Typography>
//     <Button onClick={() => setOpenHelpModal(false)} sx={{ mt: 3 }} variant="contained" fullWidth>
//       Close
//     </Button>
//   </Box>
// </Modal>
//     </AppBarStyle>
//   );
// };

// export default MainHeader;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Modal, Typography,  AppBar, Box, IconButton, styled, Toolbar, Button, MenuItem } from "@mui/material";
import Text from "../assets/images/Text.png";
import { drawerWidth } from "./Layout";
import WhiteLogo from "../assets/images/WhiteLogo.png";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupButtons from "./GroupButtons";

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

const MainHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(null);
  const [hubs, setHubs] = useState([]);
  const navigate = useNavigate();
  const [openHelpModal, setOpenHelpModal] = useState(false);

  // Update menu based on user role
  useEffect(() => {
    setTimeout(() => {
      const role = sessionStorage.getItem("role");
      if (role === "THERAPIST") {
        setHubs(["Soical", "Mental Health", "News", "E-Card", "Chats", "Notes"]);
      } else if (role === "MODERATOR") {
        setHubs(["Soical", "Mental Health", "News", "File Sharing", "E-Card", "Files Management"]);
      } else if (role === "ADMIN") {
        setHubs(["Soical", "Mental Health", "News", "File Sharing", "E-Card", "Management"]);
      } else {
        setHubs(["Soical", "Mental Health", "News", "File Sharing", "E-Card"]);
      }
    }, 200);
  }, [sessionStorage.getItem("role")]); // Updates when role changes

  const handlePageNavigation = (hub) => {
    switch (hub) {
      case "Soical":
        navigate("SocialHub");
        break;
      case "Mental Health":
        navigate("MentalHealthHub");
        break;
      case "News":
        navigate("News");
        break;
      case "NewsManagement":
        navigate("NewsManagement");
        break;
      case "File Sharing":
        navigate("FileSharing");
        break;
      case "E-Card":
        navigate("ECard");
        break;
      case "Chats":
        navigate("TherapistChats");
        break;
      case "Notes":
        navigate("TherapistNotes");
        break;
      case "Files Management":
        navigate("FilesManagement");
        break;
      case "Students":
        navigate("Students");
        break;
      case "Moderators":
        navigate("Moderators");
        break;
        case "Banned Users":
        navigate("BannedUsers");
        break;
      case "News Management":
        navigate("NewsManagement");
        break;
      default:
        break;
    }
  };

  const handleOpenUserMenu = (event) => {
    setShowUserMenu(event.currentTarget);
  };

  const handleCloseUserMenu = (buttonName) => {
    setShowUserMenu(null);
    if (buttonName === "Logout") {
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <AppBarStyle position="fixed">
      <ToolbarStyle>
        {/* Left side items */}
        <ContainerStyle onClick={() => navigate("/Home")}>
          <img src={WhiteLogo} width={"40px"} height={"40px"} style={{ marginLeft: 15 }} />
          <img src={Text} width={"90px"} height={"15px"} style={{ marginLeft: 5, marginTop: 18 }} />
        </ContainerStyle>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            color: "white",
            flexWrap: "wrap", // Allow buttons to wrap on smaller screens
          }}
        >
          {hubs.map((hub, index) => {
            // If hub is "Management", display the split button (GroupButtons)
            if (hub === "Management") {
              return (
                <GroupButtons key={index} handlePageNavigation={handlePageNavigation} />
              );
            }

            // For other hubs, render a normal button
            return (
              <Button
                key={index}
                color="inherit"
                onClick={() => handlePageNavigation(hub)}
                sx={{
                  fontSize: "16px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  textTransform: "none",
                  "@media (max-width:600px)": {
                    fontSize: "14px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  },
                }}
              >
                {hub}
              </Button>
            );
          })}
        </Box>

        {/* Right side items (User Menu) */}
        <ContainerStyle>
          <IconButton color="inherit" onClick={handleOpenUserMenu}>
            <AccountCircleOutlinedIcon sx={{ color: "white", fontSize: "2.2rem" }} />
            <KeyboardArrowDownOutlinedIcon sx={{ color: "white", fontSize: "2.2rem" }} />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            open={Boolean(showUserMenu)}
            anchorEl={showUserMenu}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => { navigate("/ProfilePage"); handleCloseUserMenu(); }}>
              {sessionStorage.getItem("fullname")}
            </MenuItem>
            <MenuItem onClick={() => { setOpenHelpModal(true); handleCloseUserMenu(); }}>
              Help
            </MenuItem>
            <MenuItem onClick={() => handleCloseUserMenu("Logout")}>Logout</MenuItem>
          </Menu>
        </ContainerStyle>
      </ToolbarStyle>
      
      {/* Help Modal */}
      <Modal
        open={openHelpModal}
        onClose={() => setOpenHelpModal(false)}
        aria-labelledby="help-modal-title"
        aria-describedby="help-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="help-modal-title" variant="h6" component="h2" sx={{textAlign:"center" , fontWeight:"bold"}}>
            Need Help?
          </Typography>
          <Typography id="help-modal-description" sx={{ mt: 2 }}>
            For assistance, please contact us at 
            <br /> 
            <a href="mailto:help@juniverse.com">help@juniverse.com.</a>
            <br />
            Our support team will get back to you as soon as possible.
          </Typography>
          <Button onClick={() => setOpenHelpModal(false)} sx={{ mt: 3 }} variant="contained" fullWidth>
            Close
          </Button>
        </Box>
      </Modal>
    </AppBarStyle>
  );
};

export default MainHeader;
