// import React,{useState} from 'react';
// import { Button,Grid,TextField,InputAdornment,CssBaseline} from "@mui/material";
// import { AccountCircle,LockRounded } from '@mui/icons-material';
// import Logo from "../../assets/images/Logo.png"
// import LoginStyle from './LoginStyle';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// function Login() {
// const navigate=useNavigate();
// const [Username,setUsername]=useState("");
// const [Password,setPassword]=useState("");

// const handleSubmit=()=>{
//   if (Username=="hiba" && Password=="hiba")//This will be change once the login API is ready
//  {navigate("/")}
//   else{
//     Swal.fire({
//       title: 'Error!',
//       text: 'Username / Password Invaild',
//       icon: 'error',
//       confirmButtonText: 'Cancel'
//     })
//   }
//   }

// return (
//     <div>
//     <Grid container direction="row" sx={LoginStyle.MainGrid}  >
//       <Grid item xs={12} sm={6}>
//         <img
//           src={Logo}
//          style={LoginStyle.Img}
//           alt="JUniVerse"
//         />
//       </Grid>
//       <Grid
//         container
//         item
//         xs={12}
//         sm={6}
//         alignItems="center"
//         direction="column"
//         justify="space-between"
//         style={LoginStyle.LoginForm}
//       >
//         <div />

//           <TextField
//             type="text"
//             label="Username"
//             margin="normal"
//             onChange={(event)=>setUsername(event.target.value)}

//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountCircle />
//                 </InputAdornment>
//               )
//             }}
//           />
//           <TextField
//             type="password"
//             label="Password"
//             margin="normal"
//             onChange={(event)=>setPassword(event.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockRounded />
//                 </InputAdornment>
//               )
//             }}
//           />
//           <div style={{ height: 20 }} />
//           <Button onClick={handleSubmit}  sx={LoginStyle.LoginButton} variant="contained">
//             Login
//           </Button>
//           <div style={{ height: 20 }} />

//         <div />
//         <Button sx={{ color: 'black', textTransform: 'capitalize',marginBottom:2 }}>forgot password?</Button>

//         <Button  sx={LoginStyle.RegistButton} variant="contained">
//             RIGIST
//           </Button>

//       </Grid>
//     </Grid>
//   </div>
//   );
// };

// export default Login;

import { Typography, Link, Container } from "@mui/material";
import { styled } from "@mui/material";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FormLogin from "../../components/FormLogin";
import LeftPanel from "../../components/LeftPanel";
import SectionDivider from "../../components/SectionDivider";

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
      <ContainerBoxStyle container>
        <LeftPanel img={LoginPhoto} imgAlt="Login Image" />

        <RightPanelStyle>
          <Container maxWidth="xs" className="form_Container">
            {/* Buttons */}

            {/* The Actual Form 👇 */}
            <FormLogin />
          </Container>
        </RightPanelStyle>
      </ContainerBoxStyle>
    </>
  );
};

export default Login;
