import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Dialog,
} from "@material-ui/core";
import image from "../assets/image_not_available.png";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    paddingBottom: theme.spacing(3),
    paddingLeft: null,
    paddingRight: null,
    paddingTop: theme.spacing(2),
    width: "100%",
  },
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
    maxWidth: 420,
  },
  dialogPaperScrollPaper: {
    maxHeight: "none",
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  image: {
    // height: "auto",
    width: "100%",    
  },
}));

function ImageModal(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{
        paper: classes.dialogPaper,
        paperScrollPaper: classes.dialogPaperScrollPaper,
      }}
    >
      <DialogTitle className={classes.dialogTitle} disableTypography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Product Image</Typography>
          <IconButton
            onClick={onClose}
            style={{ marginRight: -12, marginTop: -10 }}
            // disabled={disabled}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <img 
          className={classes.image}
          src={image}
          alt=""
        />
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;
