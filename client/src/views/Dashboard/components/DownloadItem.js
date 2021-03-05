import React from "react";
import { Box, IconButton, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  root: {
   },
  content: {
    flex: "1 1 auto",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    flex: "0 0 auto",
    marginRight: 16,
    backgroundColor: "#fff",
  },
  action: {
    flex: "0 0 auto",
    marginRight: -8,
  },
}));

const DownloadItem = (props) => {
  const {fileName, updatedAt, onClick} = props
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
    >
      <Avatar className={classes.avatar}>
        {props.children}
      </Avatar>
      <div className={classes.content}>
        <Typography
          variant="body2"
          className={classes.title}
          component="span"
          display="block"
        >
          {fileName}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="span"
          display="block"
        >
          {updatedAt}
        </Typography>
      </div>
      <div className={classes.action}>
        <IconButton onClick={onClick}>
          <GetAppIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default DownloadItem;
