import React, { useState, useEffect } from "react"; // Corrected import for useState and useEffect
import { Box, Typography } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CircleIcon from '@mui/icons-material/Circle';
import JuUniVerseAxios from "../../API/JuUniVerseAxios";

function ECard() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    JuUniVerseAxios.get("/sys-user/profile").then(res => {
      setUserName(res.data.data.firstName + ' ' + res.data.data.lastName)
    })


  }, [])
  return (
    <Box sx={{
      width: 600,
      height: 350,
      backgroundColor: "#008033",
      borderRadius: "15px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      // padding: 2,
    }}>

      <Box sx={{ backgroundColor: "white", height: 60, marginTop: 8, padding: 1 }}>
        <Typography
          sx={{
            fontWeight: "bold", // makes the text bold
            fontSize: 35, // adjusts the size of the text
            lineHeight: "40px", // vertically centers the text inside the white box
            color: "#FF0000",
          }}
        >
          LINC
        </Typography>
      </Box>
      <Box sx={{ position: "absolute", top: 170, left: 20 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
          {userName}
        </Typography>
        <Typography sx={{ marginTop: 2, fontSize: 15, fontWeight: "bold", color: "white" }}>
          King Abdullah II School of Information Technology
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align the icon to the right
          marginTop: "auto", // Push the icon to the bottom of the card
        }}
      >

        {/* Square black background around the icon */}
        <Box
          sx={{
            backgroundColor: "black", // Black background
            width: "50px", // Match the icon size (width)
            height: "50px", // Match the icon size (height)
            display: "flex", // Center the icon inside the box
            justifyContent: "center", // Align horizontally
            alignItems: "center", // Align vertically
            marginTop: 7,
            marginRight: 5,
          }}
        >
          <AccountBoxIcon sx={{ fontSize: 80, color: "white" }} /> {/* White filled icon */}

        </Box>



      </Box>
      <Box sx={{ float: 'right', marginRight: '70px' }}> <CircleIcon
        sx={{
          color: "#ffc000",
          fontSize: 60,
          marginTop: 5,
          marginRight: '-22px'
          // marginRight: 5,
        }}
      />

        {/* Yellow Circle */}
        <CircleIcon
          sx={{
            color: "#f00",
            fontSize: 60,
            marginTop: 5,

            // marginLeft: 5,
          }}
        /> </Box>

    </Box>
  );

};
export default ECard;