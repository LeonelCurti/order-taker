import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import ListIcon from "@material-ui/icons/ListAltSharp";
import QueuqueIcon from "@material-ui/icons/QueueSharp";
import SidebarNav from "./SidebarNav";
import Profile from './Profile'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose } = props;

  const classes = useStyles();

  const pages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Product List",
      href: "/product_list",
      icon: <ListIcon />,
    },
    {
      title: "My orders",
      href: "/my_orders",
      icon: <ShoppingBasketIcon />,
    },
    {
      title: "New order",
      href: "/new_order",
      icon: <QueuqueIcon />,
    },   
    {
      title: "Account",
      href: "/account",
      icon: <AccountBoxIcon />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={classes.root}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
