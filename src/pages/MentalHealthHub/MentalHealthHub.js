import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrivateChat from "../../components/PrivateChat";
import ResponsiveDev from "../../components/ResponsiveDev";
import { Grid } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

function MentalHealthHub() {
  const [open, setOpen] = useState(null);
  const handleOpen = (index) => setOpen(index);
  const handleClose = () => setOpen(null);

  const modalContent = [ //array
    {
      title: "Depression",
      description: (
        <>
          <p>
            Feeling very sad for a long time and losing interest in things you
            used to enjoy?
          </p>
          <p>
            -Talk to someone you trust, try to stay active, and speak to a
            doctor if it doesn’t get better.
          </p>
          <Button 
  variant="contained" 
  sx={{ 
    background: 'linear-gradient(#6861bd , #3873D4 , #22a9d3)',
    color: 'white',
justifyContent:"center",
marginLeft:15
  }}
  onClick={handleClose}
>
<FavoriteIcon/>
</Button>
        </>
      ),
    },
    {
      title: "Anxiety",
      description: (
        <>
          <p>
            Feeling nervous, scared, or worried about things, even when there’s
            no big problem?
          </p>
          <p>
            -Take deep breaths, try to relax, and focus on one thing at a time.
            Talking to someone can also help.
          </p>
          <Button 
  variant="contained" 
  sx={{ 
    background: 'linear-gradient(#6861bd , #3873D4 , #22a9d3)',
    color: 'white',
justifyContent:"center",
marginLeft:15
  }}
  onClick={handleClose}
>
<FavoriteIcon/>
</Button>
        </>
      ),
    },
    {
      title: "Burnout",
      description: (
        <>
          <p>
            Feeling very tired and stressed because of working too hard or too
            much?
          </p>
          <p>
            -Take breaks, get enough sleep, and do something you enjoy to relax.
          </p>
          <Button 
  variant="contained" 
  sx={{ 
    background: 'linear-gradient(#6861bd , #3873D4 , #22a9d3)',
    color: 'white',
justifyContent:"center",
marginLeft:15
  }}
  onClick={handleClose}
>
<FavoriteIcon/>
</Button>
        </>
      ),
    },
    {
      title: "Sleep Disorders",
      description: (
        <>
          <p>
            Having problems with sleep, like not sleeping well or waking up too
            often?
          </p>
          <p>
            -Stick to a bedtime routine, avoid screens before bed, and talk to a
            doctor if it continues.
          </p>
          <Button 
  variant="contained" 
  sx={{ 
    background: 'linear-gradient(#6861bd , #3873D4 , #22a9d3)',
    color: 'white',
justifyContent:"center",
marginLeft:15
  }}
  onClick={handleClose}
>
<FavoriteIcon/>
</Button>
        </>
      ),
    },
    {
      title: "Perfectionism",
      description: (
        <>
          <p>
            Always wanting things to be perfect, which can make you feel
            stressed?
          </p>
          <p>
            -Remind yourself it’s okay to make mistakes. Focus on doing your
            best, not being perfect.
          </p>
          <Button 
  variant="contained" 
  sx={{ 
    background: 'linear-gradient(#6861bd , #3873D4 , #22a9d3)',
    color: 'white',
justifyContent:"center",
marginLeft:15
  }}
  onClick={handleClose}
>
<FavoriteIcon/>
</Button>
        </>
      ),
    },
    {
      title: "Imposter Syndrome",
      description: (
        <>
          <p>
            Feeling like you’re not good enough, even when you’ve done well?
          </p>
          <p>
            -Remind yourself of your successes and talk to a friend or mentor
            for support.
          </p>
          <Button 
  variant="contained" 
  sx={{ 
    background: 'linear-gradient(#6861bd , #3873D4 , #22a9d3)',
    color: 'white',
justifyContent:"center",
marginLeft:15
  }}
  onClick={handleClose}
>
<FavoriteIcon/>
</Button>
        </>
      ),
    },
  ];

  return (
    <ResponsiveDev>
      <Box //The entire screen style
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", // Full screen height
          p: 2,
        }}
      >
        <Grid container justifyContent="center">
          {modalContent.map((content, index) => ( //And I change the map func to be one func 
            <Grid //extra style for small/large screens
              item
              xs={12}
              sm={6}
              md={4} //done extra style
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              
              }}
            >
              <Box
                sx={{
                  width: "200px", // Fixed width
                  height: "60px", // Fixed height
                  marginBottom: "50px",
                  marginTop: "20px", // Space below each button
                }}
              >
                <Button
                  onClick={() => handleOpen(index)}
                  sx={{
                    width: "95%",
                    height: "160%",
                    fontSize: "1rem",
                    border: "6px solid rgb(159, 187, 219)  ",
                    borderRadius: "70px",
                    color: "#474189",
                    fontFamily: "cursive",
                    "&:hover": {
                      bgcolor: "#c4c2dc",
                   
                    },
                  }}
                >
                  {content.title}
                </Button>
                <Modal open={open === index} onClose={handleClose}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "90%",
                      maxWidth: 400,
                      bgcolor: "#eeeeee",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: 2,
                    }}
                  >
                  
                    <Typography
                      id={`modal-description-${index}`}
                      sx={{fontWeight: "bold" , mt: 2 , backgroundColor: "#efe7f4 "}}
                      color= "#474189"
                      
                    >
                      {content.description}
                    </Typography>
                  </Box>
                </Modal>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'  }}><a href="https://www.who.int/health-topics/mental-health#tab=tab_1"> <strong > Read more about your mental health! </strong> </a> 
      <a href="https://findahelpline.com/countries/jo"> <strong >Reach out for JCPA Hotline! 

</strong> </a> 
  </div>;
      <PrivateChat></PrivateChat>
    </ResponsiveDev>
  );
}

export default MentalHealthHub;  