import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Text from "../assets/images/Text.png";
import MenuItem from "@mui/material/MenuItem";
import {
  AppBar,
  Box,
  IconButton,
  styled,
  Toolbar,
  Button,
} from "@mui/material";

import { drawerWidth } from "./Layout";
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

  // Update menu based on user role
  useEffect(() => {
    setTimeout(() => {
  
      const role = sessionStorage.getItem("role");
      if (role === "THERAPIST") {
        setHubs(["Soical", "Mental Health", "News", "E-Card", "Therapist"]);
      } else {
        setHubs(["Soical", "Mental Health", "News", "File Sharing", "E-Card"]);
      }
    }, 100);
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
      case "File Sharing":
        navigate("FileSharing");
        break;
      case "E-Card":
        navigate("ECard");
        break;
      case "Therapist":
        navigate("TherapistChats");
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
          {hubs.map((hub, index) => (
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
          ))}
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
            <MenuItem onClick={() => handleCloseUserMenu()}>Help</MenuItem>
            <MenuItem onClick={() => handleCloseUserMenu("Logout")}>Logout</MenuItem>
          </Menu>
        </ContainerStyle>
      </ToolbarStyle>
    </AppBarStyle>
  );
};

export default MainHeader;
