import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../assets/logo--white.svg";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.common.white,
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  flexGrow: {
    flexGrow: 1,
  },
  userNameText: {
    // color: theme.palette.text.primary,
    // fontWeight: theme.typography.fontWeightBold,
    textTransform: "uppercase",
  },
  logoImg: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    alignItems: "center",
  },
}));

const TopBar = (props) => {
  const { className, user, onSidebarOpen, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.appBarToolbar}>
        <RouterLink to="/dashboard">
        <img
            alt="Logo"
            src={Logo}
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <Typography className={classes.userNameText}>
            {user.firstName}
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
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
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(TopBar);
