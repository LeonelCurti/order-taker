import React, { useState } from "react";
// import clsx from "clsx";
// import MUIDataTable from "mui-datatables";
import Layout from "../components/layout/Layout";
import TableSearch from "../components/Test/TableSearch";
import {
  Paper,
  Typography,
  Container,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  Toolbar,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../components/PageHeader";
import PrintIcon from "@material-ui/icons/Print";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Testing = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Container maxWidth="md" className={classes.container}>
        <PageHeader title="Page Title" />
        <Paper>
          <EnhancedTableToolbar title="Table Title" />
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Layout>
  );
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    "@media print": {
      display: "none",
    },
  },
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
  "@media screen and (max-width: 480px)": {},
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
          <div className={classes.titleRoot} aria-hidden={"true"}>
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

export default Testing;
