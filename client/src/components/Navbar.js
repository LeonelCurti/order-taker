import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo1 from "../assets/logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";

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
    width: theme.spacing(7),
    height: theme.spacing(7),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));

const Navbar = ({ onSidebarOpen }) => {
  const classes = useStyles();;
  const notifications = ['msg1', 'msg2'];

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
          <IconButton className={classes.signOutButton} color="inherit">
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

export default Navbar;
