import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ListIcon from "@material-ui/icons/ListAltSharp";
import QueuqueIcon from "@material-ui/icons/QueueSharp";
import SidebarNav from "./SidebarNav";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,  
    [theme.breakpoints.up("lg")]: {
      width: 180, 
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose } = props;
  const classes = useStyles();

  const pages = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      title: "Catalog",
      href: "/catalog",
      icon: <ListIcon fontSize="small" />,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <ShoppingBasketIcon fontSize="small" />,
    },
    {
      title: "New order",
      href: "/new_order",
      icon: <QueuqueIcon fontSize="small" />,
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
      <SidebarNav pages={pages} onClose={onClose} />
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
