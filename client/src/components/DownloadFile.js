import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, Box, IconButton, Typography, Avatar } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 140,//
    padding: theme.spacing(2),
  },
  content: {
    flex: "1 1 auto",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    flex: "0 0 auto",
    marginRight: 16,
    backgroundColor: "#fff",
  },
  action: {
    flex: "0 0 auto",
    marginRight: -8,
  },
}));

const Budget = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        // style={{ border: "1px solid red" }}
      >
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="body2"
        >
          DOWNLOAD FILES
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
        >
          <Avatar className={classes.avatar}>
            <AssignmentIcon color="primary" fontSize="large" />
          </Avatar>
          <div className={classes.content}>
            <Typography
              variant="body2"
              className={classes.title}
              component="span"
              display="block"
            >
              PriceList.xlsx
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="span"
              display="block"
            >
              Updated 12/8/20
            </Typography>
          </div>
          <div className={classes.action}>
            <IconButton>
              <GetAppIcon />
            </IconButton>
          </div>
        </Box>
      </Box>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
