import React, { forwardRef } from "react";
import { NavLink as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button, Divider, Hidden } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#fafbfc",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.grey[700],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "uppercase",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightRegular,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    // ...theme.mixins.toolbar,
  },
  icon: {
    color: theme.palette.grey[700],
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { pages, logout, onClose } = props;
  const classes = useStyles();

  const handleLogout = () => {
    logout();
  };
  const handleDrawerClose = () => {
    onClose();
  };

  return (
    <Fragment>
      <Hidden lgUp>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
      </Hidden>
      <List className={classes.root}>
        {pages.map((page) => (
          <ListItem className={classes.item} disableGutters key={page.title}>
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          </ListItem>
        ))}
        <ListItem className={classes.item} disableGutters>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            onClick={handleLogout}
          >
            <div className={classes.icon}>
              <InputIcon fontSize="small" />
            </div>
            Logout
          </Button>
        </ListItem>
      </List>
    </Fragment>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default connect(null, { logout })(withRouter(SidebarNav));
