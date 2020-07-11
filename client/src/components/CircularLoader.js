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

function CircularLoader() {
  const classes = useStyles();

  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress />
    </div>
  );
}

export default CircularLoader;