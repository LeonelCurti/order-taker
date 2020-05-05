import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo2 from "../assets/logo2.png";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logout } from "../actions/auth";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    // boxShadow: theme.shadows[1],
    // boxShadow: "none",
    backgroundColor: theme.palette.common.white,
    // backgroundColor: theme.palette.secondary,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  userNameText: {
    color: theme.palette.text.primary,
    // fontWeight: theme.typography.fontWeightBold,
    textTransform: "uppercase",
  },

  logoImg: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    alignItems: "center",
  },
}));

const Navbar = ({ onSidebarOpen, user }) => {
  const classes = useStyles();

  return (
    <AppBar elevation={0} className={classes.AppBar}>
      <Toolbar className={classes.appBarToolbar}>
        <RouterLink to="/dashboard">
          <img src={Logo2} alt="logo" className={classes.logoImg} />
        </RouterLink>

        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          width="100%"
        >
          <Hidden mdDown>
            <Typography className={classes.userNameText}>
              {user.firstName}
            </Typography>
            <IconButton color="primary">
              <AccountCircle />
            </IconButton>
          </Hidden>

          <Hidden lgUp>
            <IconButton color="primary" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(Navbar);
