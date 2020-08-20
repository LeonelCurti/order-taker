import React from "react";
import { connect } from "react-redux";
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { clearAlert } from "../redux/actions/alert";


const AlertSnackbar = (props) => {
  const { alertMessage, isOpen, clearAlert } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    clearAlert();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
      message={alertMessage ? alertMessage : undefined}
      action={
        <React.Fragment>
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  alertMessage: state.alert.msg,
  severity: state.alert.severity,
  isOpen: state.alert.isOpen,
});

export default connect(mapStateToProps, { clearAlert })(AlertSnackbar);
