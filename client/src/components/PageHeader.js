import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    // border: "1px solid red",
  },
}));

const PageHeader = ({ title, subtitle, className, ...attrs }) => {
  const classes = useStyles();


  return (
    <div className={clsx(classes.root, className)}>
      <Grid container  className={classes} {...attrs}>
        <Grid item xs={12} sm={4}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default PageHeader;
