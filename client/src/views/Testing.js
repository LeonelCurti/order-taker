import React, { useState, Fragment } from "react";
import clsx from "clsx";
import MUIDataTable from "mui-datatables";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import StatusBullet from "../components/StatusBullet";
import jsPDF from "jspdf";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import "jspdf-autotable";
import Layout from "../components/layout/Layout";
import TableSearch from "../components/Test/TableSearch";
import {
  Box,
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
  Hidden,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../components/PageHeader";
import PrintIcon from "@material-ui/icons/Print";
import SearchIcon from "@material-ui/icons/Search";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border:'1px solid red',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    // border:'1px solid green'
  },
  paper: {},
  table: {
    // minHeight: 400,
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actionIcon: {
    paddingRight: "30px",
  },
  tableCellIcon: {
    // paddingLeft: "10px",
    // paddingRight: "10px",
    width: 100,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const myOrders = [
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f7d10c034fd5526802828d1",
    number: 242,
    createdAt: "2020-10-07T00:50:08.855Z",
    updatedAt: "2020-10-07T00:50:08.855Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f7d0c03d9180218f0d892c7",
    number: 241,
    createdAt: "2020-10-07T00:29:55.497Z",
    updatedAt: "2020-10-07T00:29:55.497Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f76a0a2b20b6c17184d21d6",
    number: 240,
    createdAt: "2020-10-02T03:38:10.605Z",
    updatedAt: "2020-10-02T03:38:10.605Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f769ff055ad102378dd6b3a",
    number: 239,
    createdAt: "2020-10-02T03:35:12.667Z",
    updatedAt: "2020-10-02T03:35:12.667Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f769c0323fb452df857b235",
    number: 238,
    createdAt: "2020-10-02T03:18:27.364Z",
    updatedAt: "2020-10-02T03:18:27.364Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f769c0023fb452df857b234",
    number: 237,
    createdAt: "2020-10-02T03:18:24.915Z",
    updatedAt: "2020-10-02T03:18:24.915Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f769bfe23fb452df857b233",
    number: 236,
    createdAt: "2020-10-02T03:18:22.504Z",
    updatedAt: "2020-10-02T03:18:22.504Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f769bfc23fb452df857b232",
    number: 235,
    createdAt: "2020-10-02T03:18:20.089Z",
    updatedAt: "2020-10-02T03:18:20.089Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f76975852f107233074117a",
    number: 234,
    createdAt: "2020-10-02T02:58:32.799Z",
    updatedAt: "2020-10-02T02:58:32.799Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "open",
    _id: "5f76975552f1072330741179",
    number: 233,
    createdAt: "2020-10-02T02:58:29.728Z",
    updatedAt: "2020-10-02T02:58:29.728Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: "4",
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: "4",
      },
    ],
    total: 640,
    notes: "",
    state: "submitted",
    _id: "5f693932b0ddd6145c2c7e7e",
    number: 219,
    createdAt: "2020-09-21T23:37:22.289Z",
    updatedAt: "2020-09-23T22:16:49.034Z",
    __v: 0,
  },
  {
    items: [
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: 2,
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: 3,
      },
    ],
    total: 557.04,
    notes: "",
    state: "submitted",
    _id: "5f67ec8772c18d2cd493824e",
    number: 218,
    createdAt: "2020-09-20T23:57:59.993Z",
    updatedAt: "2020-09-20T23:58:02.057Z",
    __v: 0,
  },
  {
    items: [
      {
        cod: "038167",
        descrip: "BOYA TRIANGULO PVC",
        price: 187.76,
        quantity: "4",
        id: 1469335,
      },
      {
        cod: "038166",
        descrip: "BOYA CILINDRICA PVC",
        price: 186.37,
        quantity: "4",
        id: 1469335,
      },
      {
        id: 1469335,
        cod: "456963",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 4,
      },
      {
        id: 1469335,
        cod: "951535",
        descrip: "CONTROL REMOTO",
        price: 60,
        quantity: "4",
      },
      {
        id: 1469335,
        cod: "753003",
        descrip: "MOCHILA CAMUFLADA",
        price: 100,
        quantity: "4",
      },
    ],
    total: 2273.56,
    notes: "",
    state: "submitted",
    _id: "5f5fef81c31f960630f03ba8",
    number: 217,
    createdAt: "2020-09-14T22:32:33.217Z",
    updatedAt: "2020-09-14T22:33:01.611Z",
    __v: 0,
  },
];

// const myOrders = [];
const statusColors = {
  received: "success",
  open: "info",
  submitted: "warning",
};
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gidfgbr1", 356, 16.0, 49, 3.9),
  createData("Gingerbr2", 356, 16.0, 49, 3.9),
  createData("Gingerbde3", 356, 16.0, 49, 3.9),
  createData("Gdfgdngerbrd5", 356, 16.0, 49, 3.9),
  createData("Gingerdf7", 356, 16.0, 49, 3.9),
  createData("Ginger8", 356, 16.0, 49, 3.9),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const exportPDF = (order) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  // doc.setFontSize(15);

  const title = `Order nº ${order.number}`;
  const headers = [["Code", "Description", "Qty", "Price", "Subtotal"]];

  // const people = [
  //   {
  //     name:
  //       "Keanu Reevettttttttttttttttttttttttttttttttttgergergergergergergergergergergergergergergergergtttttttttttttttttttttts",
  //     profession: "Actor",
  //   },
  //   { name: "Lionel Messi", profession: "Football Player" },
  //   { name: "Cristiano Ronaldo", profession: "Football Player" },
  //   { name: "Jack Nicklaus", profession: "Golf Player" },
  // ];

  // const data = order.items.map((elt) => [
  //   elt.cod,
  //   elt.descrip,
  //   elt.quantity,
  //   elt.price,
  //   elt.price * elt.quantity,
  // ]);

  // let content = {
  //   startY: 50,
  //   head: headers,
  //   body: data,
  // };

  doc.text(title, marginLeft, 40);
  // doc.autoTable(content);
  // doc.save("report.pdf");
  // doc.output("dataurlnewwindow");
  // window.open(doc.output("pdfjsnewwindow"));
  // window.open(doc.output('bloburl'))
  doc.setProperties({
    title: "Testpdfleo",
  });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(doc.output("blob"), "Name.pdf");
  } else {

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    // doc.autoPrint();
    window.open(
      URL.createObjectURL(doc.output("blob")),
      "_blank",
    );

    // For Firefox it is necessary to delay revoking the ObjectURL
    setTimeout(() => {
      window.URL.revokeObjectURL(doc.output("bloburl"));
    }, 100);
  }
};

const Testing = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteTargetDialogClose = () => {};
  const handleDeleteTargetDialogOpen = (order) => {};
  const handleEditOrder = (order) => {};
  const handleViewOrder = (order) => {};
  const handleDeleteOrder = () => {};

  return (
    <Layout>
      <div className={classes.root}>
        <Container maxWidth="md" className={classes.container}>
          <Hidden lgUp>
            <PageHeader title="Page Title" />
          </Hidden>
          {/* <MUIDataTable
            title={"Employee List"}
            data={data}
            columns={columns}
            options={options}
          /> */}
          <Paper elevation={2} className={classes.paper}>
            <EnhancedTableToolbar title="Table Title" />
            <TableContainer className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nº</TableCell>
                    <TableCell>Last update</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center" colSpan={2}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myOrders.length > 0 ? (
                    (rowsPerPage > 0
                      ? myOrders.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : myOrders
                    ).map((order, i) => (
                      <TableRow hover key={i}>
                        <TableCell>{order.number}</TableCell>
                        <TableCell style={{ minWidth: 180 }}>
                          {moment(order.updatedAt).format("DD/MM/YYYY  h:mm a")}
                        </TableCell>
                        <TableCell style={{ width: 120 }}>
                          <Box display="flex" alignItems="center">
                            <StatusBullet
                              className={classes.status}
                              color={statusColors[order.state]}
                              size="sm"
                            />
                            <span>{order.state}</span>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{order.total}</TableCell>

                        {order.state === "open" ? (
                          <Fragment>
                            <TableCell
                              align="center"
                              padding="checkbox"
                              className={classes.tableCellIcon}
                            >
                              <Tooltip title="Edit">
                                <IconButton
                                  color="default"
                                  onClick={() => handleEditOrder(order)}
                                >
                                  <EditOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                            <TableCell
                              align="center"
                              padding="checkbox"
                              className={classes.tableCellIcon}
                            >
                              <Tooltip title="Delete">
                                <IconButton
                                  color="default"
                                  onClick={() =>
                                    handleDeleteTargetDialogOpen(order)
                                  }
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <TableCell
                              align="center"
                              padding="checkbox"
                              className={classes.tableCellIcon}
                            >
                              <Tooltip title="Print">
                                <IconButton
                                  disabled={order.state === "open"}
                                  color="default"
                                  onClick={() => exportPDF(order)}
                                >
                                  <PrintOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                            <TableCell
                              align="center"
                              padding="checkbox"
                              className={classes.tableCellIcon}
                            >
                              <Tooltip title="View">
                                <IconButton
                                  color="default"
                                  onClick={() => handleViewOrder(order)}
                                >
                                  <VisibilityOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </Fragment>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <Fragment>
                      <TableRow style={{ height: 52.8 }}>
                        <TableCell
                          style={{
                            textAlign: "center",
                          }}
                          colSpan={5}
                        >
                          "Sorry we could not find any records!"
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ height: 52.8 * rowsPerPage - 1 }}>
                        <TableCell colSpan={5} />
                      </TableRow>
                    </Fragment>
                  )}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 52.8 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      count={myOrders.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </div>
    </Layout>
  );
};
//aca

const columns = ["Name", "Company", "City", "State"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filter: false,
  tableBodyHeight: "400px",
  viewColumns: false,
  // resizableColumns:true
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
          <IconButton
            classes={{ root: classes.icon }}
            onClick={handleSearchIconClick}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton classes={{ root: classes.icon }}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download">
          <IconButton classes={{ root: classes.icon }} onClick={exportPDF}>
            <PictureAsPdfIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

export default Testing;
