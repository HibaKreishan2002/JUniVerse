import { useState } from "react";
import { Box, styled, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

// import MainHeader from "./MainHeader";
import Header from "./Header";
const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  padding: theme.spacing(2.5),
}));

const ProjectLayout = (props) => {
  // window width
  const [toggleMenu, setToggleMenu] = useState(false);

  // toggle drawer
  const handleToggleDrawer = () => setToggleMenu(!toggleMenu);

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <Header />
      {/* Content */}
      <MainStyle>
        <Toolbar />
        {/* Main parts */}
        {/* {props.children} */}
        <Outlet />
      </MainStyle>
    </Box>
  );
};

export default ProjectLayout;

export const drawerWidth = 0;
