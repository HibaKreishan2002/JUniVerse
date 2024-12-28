import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PrivateChat from '../../components/PrivateChat';

function MentalHealthHub() {
    const [open, setOpen] = useState(null);
 
    const handleOpen = (index) => setOpen(index);
    const handleClose = () => setOpen(null);

    const modalContent = [
        {
          title: "Depression",
          description: (
            <>
              <p>Feeling very sad for a long time and losing interest in things you used to enjoy?</p>
              <p>-Talk to someone you trust, try to stay active, and speak to a doctor if it doesn’t get better.</p>
            </>
          ),
        },
        {
          title: "Anxiety",
          description: (
            <>
              <p>Feeling nervous, scared, or worried about things, even when there’s no big problem?</p>
              <p>-Take deep breaths, try to relax, and focus on one thing at a time. Talking to someone can also help.</p>
            </>
          ),
        },
        {
          title: "Burnout",
          description: (
            <>
              <p>Feeling very tired and stressed because of working too hard or too much?</p>
              <p>-Take breaks, get enough sleep, and do something you enjoy to relax.</p>
            </>
          ),
        },
        {
          title: "Sleep Disorders",
          description: (
            <>
              <p>Having problems with sleep, like not sleeping well or waking up too often?</p>
              <p>-Stick to a bedtime routine, avoid screens before bed, and talk to a doctor if it continues.</p>
            </>
          ),
        },
        {
          title: "Perfectionism",
          description: (
            <>
              <p>Always wanting things to be perfect, which can make you feel stressed?</p>
              <p>-Remind yourself it’s okay to make mistakes. Focus on doing your best, not being perfect.</p>
            </>
          ),
        },
        {
          title: "Imposter Syndrome",
          description: (
            <>
              <p>Feeling like you’re not good enough, even when you’ve done well?</p>
              <p>-Remind yourself of your successes and talk to a friend or mentor for support.</p>
            </>
          ),
        },
        
      ];

    return (
      <>
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4, // Increased space between rows
            }}
        >
            {/* First Row */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}> {/* Increased gap between buttons */}
                {modalContent.slice(0, 3).map((content, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}> {/* Margin below each button */}
                        <Button
                            onClick={() => handleOpen(index)}
                            sx={{
                                width: 200,
                                height: 60,
                                fontSize: '1rem',
                                bgcolor: 'transparent', // Transparent background
                                border: '2px solid black', // Black border
                                color: 'black', // Text color
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.1)', // Slight hover effect
                                },
                            }}
                        >
                            {content.title}
                        </Button>
                        <Modal
                            open={open == index}
                            onClose={handleClose}
                           
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'white',
                                    boxShadow: 24,
                                    p: 4,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography id={`modal-title-${index}`} variant="h6" component="h2" sx={{ mb: 2 }}>
                                    {content.title}
                                </Typography>
                                <Typography id={`modal-description-${index}`} sx={{ mt: 2 }}>
                                    {content.description}
                                </Typography>
                            </Box>
                        </Modal>
                    </Box>
                ))}
            </Box>

            {/* Second Row */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}> {/* Increased gap between buttons */}
                {modalContent.slice(3, 6).map((content, index) => (
                    <Box key={index + 3} sx={{ marginBottom: 2 }}> {/* Margin below each button */}
                        <Button
                            onClick={() => handleOpen(index + 3)}
                            sx={{
                                width: 200,
                                height: 60,
                                fontSize: '1rem',
                                bgcolor: 'transparent', // Transparent background
                                border: '2px solid black', // Black border
                                color: 'black', // Text color
                                '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.1)', // Slight hover effect
                                },
                            }}
                        >
                            {content.title}
                        </Button>
                        <Modal
                            open={open == index + 3}
                            onClose={handleClose}
                            
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'white',
                                    boxShadow: 24,
                                    p: 4,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography  variant="h6" component="h2" sx={{ mb: 2 }}>
                                    {content.title}
                                </Typography>
                                <Typography   sx={{ mt: 2 }}>
                                    {content.description}
                                </Typography>
                            </Box>
                        </Modal>
                    </Box>
                ))}
            </Box>
        </Box>
        <PrivateChat></PrivateChat>
      </>
      
    );
}

export default MentalHealthHub;
