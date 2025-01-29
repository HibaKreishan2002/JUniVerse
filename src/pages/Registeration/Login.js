import { useState } from "react";
import { Typography, Link, Container } from "@mui/material";
import { styled } from "@mui/material";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FormLogin from "../../components/FormLogin";
import LeftPanel from "../../components/LeftPanel";
import SectionDivider from "../../components/SectionDivider";
import axios from "axios";
// img
import LoginPhoto from "../../assets/images/Logo.png";

// styles
const ContainerBoxStyle = styled(Box)(({ theme }) => ({
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px)`,
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: `350px 1fr`,

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: `1fr`,
  },
}));

const RightPanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& .account_switch": {
    textAlign: "right",
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(8),
    "& .MuiLink-underlineNone	": {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(1.5),
    },
  },

  "& .form_Container": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& .MuiTypography-h4": {
      fontSize: 25,
      fontWeight: 500,
    },
    "& .MuiTypography-paragraph": {
      margin: "8px 0 20px 0",
    },
  },
}));

const Login = () => {

  return (
    <>
    {/* This is a login Page have two main Component */}
      <ContainerBoxStyle container>
        {/* This is a Left Image Component */}
        <LeftPanel img={LoginPhoto} imgAlt="Login Image" />

        <RightPanelStyle>
          <Container maxWidth="xs" className="form_Container">
            {/* Buttons */}

            {/* The Actual Form (username and password component) 👇 */}
            <FormLogin />
          </Container>
        </RightPanelStyle>
      </ContainerBoxStyle>
    </>
  );
};

export default Login;
