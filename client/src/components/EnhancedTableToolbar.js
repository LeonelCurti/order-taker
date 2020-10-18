import React, { useState } from "react";
import TableSearch from "../components/Test/TableSearch";
import {
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  SvgIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
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

const EnhancedTableToolbar = ({ title, searchTextUpdate }) => {
  const classes = useToolbarStyles();
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
    searchTextUpdate(value); //work in higher component pased by prop
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
        <Tooltip title="Search product">
          <IconButton
            classes={{ root: classes.icon }}
            onClick={handleSearchIconClick}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download Excel">
          <IconButton classes={{ root: classes.icon }}>
            <SvgIcon >
              <path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12.06L9.93 8.89H8.22L7.13 10.9L7.09 10.96L7.06 11.03Q6.8 10.5 6.5 9.96 6.25 9.43 5.97 8.89H4.16L6.05 12.08L4 15.28H5.78M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H12V15.75M13.88 11.38V8.25H12V11.38M13.88 7V4.5H8.25V7M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38M20.75 7V4.5H15.13V7Z" />
            </SvgIcon>
      
          </IconButton>
        </Tooltip>
        <Tooltip title="Download Pdf">
          <IconButton classes={{ root: classes.icon }}>
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
