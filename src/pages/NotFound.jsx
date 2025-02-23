import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to login page
      </Button>
    </Box>
  );
};

export default NotFound;
