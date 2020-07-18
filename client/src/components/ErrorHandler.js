import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IconButton, Snackbar } from "@material-ui/core";
import { errorMessageSelector } from "../store/selector/index";
import CloseIcon from "@material-ui/icons/Close";

const ErrorHandler = (props) => {
  const { error } = props;
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    console.log(`error en use efect:${error}`);
    setOpen(error ? true : false);
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={error ? error : undefined}
      action={
        <React.Fragment>
          <IconButton
            size="small"        
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  error: errorMessageSelector(['UPDATE_ORDER','SUBMIT_ORDER'], state),
});

export default connect(mapStateToProps)(ErrorHandler);
