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

function ImageModal({ title, url, onClose, open }) {
  const classes = useStyles(); 

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
          <Typography variant="h5">{title}</Typography>
          <IconButton
            onClick={onClose}
            style={{ marginRight: -12, marginTop: -10 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <img className={classes.image} src={url} alt="img" />
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;
