import React,{useState} from 'react';
import { Button,Grid,TextField,InputAdornment,CssBaseline} from "@mui/material";
import { AccountCircle,LockRounded } from '@mui/icons-material';
import Logo from "../../assets/images/Logo.png"
import LoginStyle from './LoginStyle';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Login() {
const navigate=useNavigate();
const [Username,setUsername]=useState("");
const [Password,setPassword]=useState("");

const handleSubmit=()=>{
  if (Username=="hiba" && Password=="hiba")//This will be change once the login API is ready 
 {navigate("/")}
  else{
    Swal.fire({
      title: 'Error!',
      text: 'Username / Password Invaild',
      icon: 'error',
      confirmButtonText: 'Cancel'
    })
  }
  }
  
return (
    <div>
    <Grid container direction="row" sx={LoginStyle.MainGrid}  >
      <Grid item xs={12} sm={6}>
        <img
          src={Logo}
         style={LoginStyle.Img}
          alt="JUniVerse"
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        alignItems="center"
        direction="column"
        justify="space-between"
        style={LoginStyle.LoginForm}
      >
        <div />
       
          <TextField
            type="text"
            label="Username"
            margin="normal"
            onChange={(event)=>setUsername(event.target.value)}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <TextField
            type="password"
            label="Password"
            margin="normal"
            onChange={(event)=>setPassword(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              )
            }}
          />
          <div style={{ height: 20 }} />
          <Button onClick={handleSubmit}  sx={LoginStyle.LoginButton} variant="contained">
            Login
          </Button>
          <div style={{ height: 20 }} />
          

        <div />
        <Button sx={{ color: 'black', textTransform: 'capitalize',marginBottom:2 }}>forgot password?</Button>

        <Button  sx={LoginStyle.RegistButton} variant="contained">
            RIGIST
          </Button>
       
           
          
      </Grid>
    </Grid>
  </div>
  );
};

export default Login;
