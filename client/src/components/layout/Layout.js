import React, { useState } from "react";
import Navbar from "../Navbar";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import Sidebar from "../Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 180,
  },
  content: {
    backgroundColor: '#fafbfc',
    height: "100%",
  },
}));

const Layout = (props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  //only shift main content to left in desktop mode
  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  return (
    <div  
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Navbar onSidebarOpen={handleSidebarOpen} />

      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />
      <main className={classes.content}>{props.children}</main>
    </div>
  );
};

export default Layout;
