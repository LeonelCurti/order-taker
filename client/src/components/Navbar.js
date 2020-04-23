import React from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo1 from "../assets/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { logout } from "../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    // boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  logoImg: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const Navbar = ({ onSidebarOpen, history, logout }) => {
  const classes = useStyles();
  const notifications = ["msg1", "msg2"];

  const handleLogout = () =>{
    logout(history)
  }

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <RouterLink to="/dashboard">
          <img src={Logo1} alt="logo" className={classes.logoImg} />
        </RouterLink>
        <div className={classes.flexGrow} />

        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="secondary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
           onClick={handleLogout}
          className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default connect(null, { logout })(withRouter(Navbar));
