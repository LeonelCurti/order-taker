import React from "react";
import { makeStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { Typography, Button, Box, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  content: {
    padding: "3rem",
    // paddingTop: 150,
    textAlign: "center",
  },
  button: {
    width:'35%'
  },
}));

const FetchError = (props) => {
  const classes = useStyles();
  const { message, onRetry } = props;

  const onGoDashboard = () => {
    props.history.replace("/");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <Box mb={2}>
          <Typography variant="h4" color='textPrimary'>Oops! Something went wrong.</Typography>
        </Box>
        <Box my={3}>
          <Typography variant="h6" color='textSecondary'>{message}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-around" mt={2}>
          <Button
            variant="contained"
            className={classes.button}
            disableElevation
            onClick={onGoDashboard}
          >
            Go Dashboard
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            disableElevation
            onClick={onRetry}
          >
            Retry
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default withRouter(FetchError);
