import React, { Fragment, forwardRef } from "react";
import { NavLink as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  List,
  ListItem,
  Divider,
  Hidden,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    "& .MuiListItemIcon-root": {
      minWidth: 40,
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

const ListItemLink = (props) => {
  //according to material ui recomendation
  //avoid inline functions and pass static
  //component to component prop
  const { icon, primary, to } = props;

  const renderLink = forwardRef((itemProps, ref) => (
    <RouterLink exact to={to} ref={ref} {...itemProps} />
    // <RouterLink to={to} ref={ref} {...itemProps} />
  ));

  return (
    <ListItem button component={renderLink} activeClassName="Mui-selected" >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};

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
      <List disablePadding className={classes.listContainer}>
        {pages.map((page, i) => (
          <ListItemLink
            key={i}
            to={page.href}
            primary={page.title}
            icon={page.icon}
          />
        ))}

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <InputIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Fragment>
  );
};

SidebarNav.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default connect(null, { logout })(withRouter(SidebarNav));
