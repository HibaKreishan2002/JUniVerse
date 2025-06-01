import { Box, Container } from "@mui/material";
import FormLogin from "../../components/FormLogin";
import LoginPhoto from "../../assets/images/Logo.png";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      {/* Left side - Logo */}
      <Box
        sx={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // align to left within the box
          justifyContent: "center",
          padding: 1,
          ml: 20, // push content to the right inside the box
        }}
      >
        <img
          src={LoginPhoto}
          alt="Login Image"
          style={{ maxWidth: "100%", height: "auto" }}
        />
     
      </Box>

      {/* Right side - Login form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start", // align form to the left side of the right panel
          pl: 6, // push the form to the right a bit
        }}
      >
        <Container maxWidth="xs">
          <FormLogin />
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
