import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import {Button,Checkbox,FormControlLabel,IconButton,InputAdornment,Link,} from "@mui/material";
import { styled } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import SectionDivider from "./SectionDivider";
import { useNavigate } from "react-router-dom";
import JuUniVerseAxios from "../API/JuUniVerseAxios";
import Swal from "sweetalert2";
import ResponsiveDev from "./ResponsiveDev";
// style
const FormStyle = styled("form")(({ theme }) => ({
  // root style
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(3),

  // input style
  "& label.Mui-focused": {
    color: "rgb(59, 75, 149)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(59, 75, 149)",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "rgb(59, 75, 149)",
    },
  },

  // error
  "& .Mui-error.MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "rgb(59, 75, 149)",
    },
  },
  "& label.Mui-error.Mui-focused": {
    color: "rgb(59, 75, 149)",
  },

  // checkbox style
  "& .MuiCheckbox-root": {
    color: "rgb(59, 75, 149)",
  },
  "& .Mui-checked": {
    color: "rgb(59, 75, 149)",
  },

  // forgot link style
  "& a": {
    color: "rgb(59, 75, 149)",
    fontWeight: 500,
    "&:hover": {
      color: "rgb(59, 75, 149)",
    },
  },

  // button style
  "& .MuiButton-contained": {
    backgroundColor: "rgb(59, 75, 149)",
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(1.25),
    boxShadow: `rgb(34 168 211)  0px 8px 16px 0px`,
    "&:hover": {
      backgroundColor: "rgb(34 168 211)      ",
      boxShadow: "none",
    },
  },
}));

function FormLogin () {
 //Handlling show password and remember 
  const [showPassword, setShowPassord] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleTogglePassword = () => setShowPassord(!showPassword);
  const handleToggleRemember = () => setRemember(!remember);

  const navigate = useNavigate(); 
 
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberUser: true,
    },
  });

  useEffect(()=>{
    sessionStorage.clear();
  },[])
  // prevent Default
  const preventDefault = (e) => e.preventDefault();  

  // form submit

  const onSubmit = (data) => {//This method we use it to handle Login Button 
  JuUniVerseAxios.post("/auth/signIn",{username:data.email,password:data.password}).then(res=>{
 
    sessionStorage.setItem("AUTH_TOKEN",res.data.data.token) 
  navigate("/ProfilePage");
}).catch(err=>{
  if (err?.response?.data?.message==undefined){
    Swal.fire({
      title: "ERROR",
      text: "Network Error!!",
      icon: "error"
    });
  }else{

    Swal.fire({
      title: "ERROR",
      text: err?.response?.data?.message,
      icon: "error"
    });
  }
}) }; 

  return (
    <ResponsiveDev>
 <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <TextField
        variant="outlined"
        fullWidth
        type="text"
        label="Username"
        error={errors.email ? true : false}
        helperText={errors.email && "Enter a valid username"}
        {...register("email", { required: true })}
      />

      {/* Password */}
      <TextField
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleTogglePassword}>
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        error={errors.password ? true : false}
        helperText={
          errors.password && "Enter a valid password (5-15 characters)"
        }
        {...register("password", {required: true  })}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              className="ckbox"
              checked={remember}
              onChange={handleToggleRemember}
            />
          }
          label="Remember me"
          {...register("rememberUser")}
        />

      </Box>

      <Button type="submit" variant="contained" disableElevation>
        Login
      </Button>

    </FormStyle>
    </ResponsiveDev>
   
  );
};

export default FormLogin;
