import { Typography } from "@mui/material";
import { styled } from "@mui/material";
import { Box } from "@mui/material";

// styles
const LeftPaneStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: `${theme.spacing(50)}px ${theme.spacing(300)}px`,
  borderRadius: theme.spacing(2),

  "& .MuiTypography-h3": {
    fontSize: 30,
    fontWeight: 500,
    marginBottom: 48,
  },
  "& img": {
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
    objectFit: "cover",
    marginLeft: "244px",
  },

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const LeftPanel = ({ title, img, imgAlt }) => {
  return (
    <LeftPaneStyle>
      <Typography variant="h3">{title}</Typography>

      <Box component="img" src={img} alt={imgAlt} loading="lazy" />
    </LeftPaneStyle>
  );
};

export default LeftPanel;
