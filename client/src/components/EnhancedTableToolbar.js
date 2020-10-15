import React, { useState } from "react";
import TableSearch from "../components/Test/TableSearch";
import {
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrintIcon from "@material-ui/icons/Print";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import SearchIcon from "@material-ui/icons/Search";

const useToolbarStyles = makeStyles((theme) => ({
  root: {},
  fullWidthRoot: {},
  left: {
    flex: "1 1 auto",
  },
  fullWidthLeft: {
    flex: "1 1 auto",
  },
  actions: {
    flex: "1 1 auto",
    textAlign: "right",
  },
  titleRoot: {},
  titleText: {},
  icon: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  iconActive: {
    color: theme.palette.primary.main,
  },
  filterPaper: {
    maxWidth: "50%",
  },
  filterCloseIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 100,
  },
  searchIcon: {
    display: "inline-flex",
    marginTop: "10px",
    marginRight: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    titleRoot: {},
    titleText: {
      fontSize: "16px",
    },
    spacer: {
      display: "none",
    },
    left: {
      // flex: "1 1 40%",
      padding: "8px 0px",
    },
    actions: {
      // flex: "1 1 60%",
      textAlign: "right",
    },
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      display: "block",
      "@media print": {
        display: "none !important",
      },
    },
    left: {
      padding: "8px 0px 0px 0px",
    },
    titleText: {
      textAlign: "center",
    },
    actions: {
      textAlign: "center",
    },
  },
}));

const EnhancedTableToolbar = ({ title }) => {
  const classes = useToolbarStyles();
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    //searchTextUpdate(value)//work in higher component pased by prop
  };

  const hideSearch = () => {
    setShowSearch(false);
    setSearchText("");
  };

  const handleSearchIconClick = () => {
    if (showSearch && !searchText) {
      hideSearch();
    } else {
      setShowSearch(true);
    }
  };

  return (
    <Toolbar className={classes.root}>
      <div className={classes.left}>
        {showSearch ? (
          <TableSearch
            searchText={searchText}
            onSearch={handleSearch}
            onHide={hideSearch}
            searchPlaceholder="Search"
          />
        ) : (
          <div className={classes.titleRoot}>
            <Typography
              className={true ? classes.titleText : classes.fullWidthTitleText}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {title}
            </Typography>
          </div>
        )}
      </div>
      <div className={classes.actions}>
        <Tooltip title="Search">
          <IconButton classes={{ root: classes.icon }} onClick={handleSearchIconClick}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton classes={{ root: classes.icon }}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download">
          <IconButton classes={{ root: classes.icon }}>
            <CloudDownloadIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;