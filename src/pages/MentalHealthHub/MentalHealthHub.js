import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PrivateChat from "../../components/PrivateChat";
import ResponsiveDev from "../../components/ResponsiveDev";
import { Grid } from "@mui/material";
function MentalHealthHub() {
  const [open, setOpen] = useState(null);

  const handleOpen = (index) => setOpen(index);
  const handleClose = () => setOpen(null);

  const modalContent = [
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
        </>
      ),
    },
  ];

  return (
    <ResponsiveDev>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh", // Full screen height
          p: 2,
        }}
      >
        <Grid container justifyContent="center">
          {modalContent.map((content, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
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
                  marginBottom: "16px", // Space below each button
                }}
              >
                <Button
                  onClick={() => handleOpen(index)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    fontSize: "1rem",
                    bgcolor: "transparent",
                    border: "2px solid black",
                    color: "black",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.1)",
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
                      bgcolor: "white",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      id={`modal-title-${index}`}
                      variant="h6"
                      component="h2"
                      sx={{ mb: 2 }}
                    >
                      {content.title}
                    </Typography>
                    <Typography
                      id={`modal-description-${index}`}
                      sx={{ mt: 2 }}
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
      <PrivateChat></PrivateChat>
    </ResponsiveDev>
  );
}

export default MentalHealthHub;
