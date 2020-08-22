import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

function LoadingIndicator(props) {
  const { isActive } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      {isActive ? (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      ) : (
        props.children
      )}
    </React.Fragment>
  );
}

export default LoadingIndicator;
