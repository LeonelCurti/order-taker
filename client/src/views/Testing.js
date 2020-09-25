import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    "&$noMargin": {
      margin: 0,
    },
  }),
  title: {
    marginBottom: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
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
  description: {
    maxWidth: 960,
    fontSize: 16,
  },
  content: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.background.default,
  },
  whiteBg: {
    backgroundColor: "transparent",
    margin: 0,
  },
  noMargin: {},
  colorMode: {
    backgroundColor: theme.palette.secondary.main,
    "& $title": {
      color: theme.palette.grey[100],
      "&:after": {
        borderBottom: `5px solid ${theme.palette.primary.light}`,
      },
    },
    "& $description": {
      color: theme.palette.grey[100],
    },
  },
  overflowX: {
    width: "100%",
    overflowX: "auto",
  },
}));

const Testing = (props) => {
  return (
    <PapperBlock
      title="Title"
      desc="They (allegedly) aid usability in reading tabular data by offering the user a coloured means of separating and differentiating rows from one another"
    >
      <div>contenido</div>
    </PapperBlock>
  );
};

function PapperBlock(props) {
  const classes = useStyles();
  const {
    title,
    desc,
    children,
    whiteBg,
    noMargin,
    colorMode,
    overflowX,
  } = props;
  return (
    <div>
      <Paper
        className={clsx(
          classes.root,
          noMargin && classes.noMargin,
          colorMode && classes.colorMode
        )}
        elevation={4}
      >
        <Typography variant="title" component="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography component="p" className={classes.description}>
          {desc}
        </Typography>
        <section
          className={clsx(
            classes.content,
            whiteBg && classes.whiteBg,
            overflowX && classes.overflowX
          )}
        >
          {children}
        </section>
      </Paper>
    </div>
  );
}

PapperBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  whiteBg: PropTypes.bool,
  colorMode: PropTypes.bool,
  noMargin: PropTypes.bool,
  overflowX: PropTypes.bool,
};

PapperBlock.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: false,
  overflowX: false,
};

export default Testing;
