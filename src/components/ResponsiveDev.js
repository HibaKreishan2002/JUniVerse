import React from "react";
import { styled, Container } from "@mui/material";

const ContainerStyle = styled(Container)(({ theme }) => ({
  padding: 0,
  paddingTop: theme.spacing(2),

  // product header
  // h3
  "& .productHeader": {
    fontSize: 30,
    fontWeight: 500,
  },
}));
function ResponsiveDev(props) {
  return <ContainerStyle maxWidth="lg">{props.children}</ContainerStyle>;
}

export default ResponsiveDev;
