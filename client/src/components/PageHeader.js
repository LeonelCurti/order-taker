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
  },
  title: {
    paddingBottom: theme.spacing(1),
    position: "relative",
    textTransform: "capitalize",
    fontSize: 28,
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: 40,
      borderBottom: `4px solid ${theme.palette.primary.main}`,
    },
  },
}));

const PageHeader = ({ title, subtitle, className, ...attrs }) => {
  const classes = useStyles();


  return (
    <div className={clsx(classes.root, className)}>
      <Grid container  {...attrs}>
        <Grid item xs={12} sm={4}>
          <Typography component="h5" variant="h5" className={classes.title}>
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
