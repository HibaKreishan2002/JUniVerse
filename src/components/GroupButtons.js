import React from 'react';
import { Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const options = ["News", "Students", "Moderators"];

function GroupButtons({ handlePageNavigation }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    handlePageNavigation(options[selectedIndex]);  // This navigates based on selected index (e.g., News, Students, or Moderators)
  };

  const handleMenuItemClick = (event, index) => {
    console.log(options[index]);
    
    setSelectedIndex(index);
    setOpen(false);
    handlePageNavigation(options[index]=="News"?"NewsManagement":options[index]);  // This navigates when one of the dropdown items is clicked
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ ml: 2 }}>
      <ButtonGroup
        ref={anchorRef}
        variant="outlined"
        sx={{
          border: 'none', // White border color for the ButtonGroup
        }}
      >
        <Button
                        color="inherit"

     sx={{
        fontSize: "16px",
        marginLeft: "20px",
        marginRight: "20px",
        textTransform: "none",
        border:'none',
        "@media (max-width:600px)": {
          fontSize: "14px",
          marginLeft: "10px",
          marginRight: "10px",
        },
      }}
          onClick={handleToggle}
        >
          Management <ArrowDropDownIcon sx={{ color: 'white' ,borderColor:'white'}} /> {/* White color for the dropdown arrow */}

        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );

}

export default GroupButtons;
