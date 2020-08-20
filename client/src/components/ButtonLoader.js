import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const ButtonLoader = (props) => {
  const classes = useStyles();
  const {
    className,
    text,
    size,
    color,
    variant,
    onClick,
    isLoading,
    ...other
  } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <Button
        color={color || "primary"}
        variant={variant || "contained"}
        size={size || "medium"}
        onClick={onClick}
        disabled={isLoading}
        {...other}
      >
        {text}
      </Button>
      {isLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default ButtonLoader;
