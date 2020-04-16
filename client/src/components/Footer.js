import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const Footer = () => {
  return (
    <Box py={1}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © - "}
        {new Date().getFullYear()}
        {". Develop by Leo"}
      </Typography>
    </Box>
  );
};

export default Footer;
