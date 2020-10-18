import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Layout from "../components/layout/Layout";
import StatusBullet from "../components/StatusBullet";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  Container,
  TableRow,
  Tooltip,
  Paper,
  IconButton,
  TableContainer,
  Hidden,
  TableFooter,
  TablePagination,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import * as actions from "../redux/actions/orders";
import { removeErrors } from "../redux/actions/error";
import PageHeader from "../components/PageHeader";
import ErrorBoundary from "../components/ErrorBoundary";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { generatePdf } from "../utils/generatePdf";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid red",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {},
  table: {},
  status: {
    marginRight: theme.spacing(1),
  },
  actionIcon: {
    paddingRight: "30px",
  },
  tableCellIcon: {
    width: 100,
  },
  title: {
    flexGrow: 1,
  },
}));
const statusColors = {
  received: "success",
  open: "info",
  submitted: "warning",
};

const Orders = (props) => {
  const classes = useStyles();
  const {
    myOrders,
    isFetchingOrders,
    errorGetOrders,
    getOrders,
    deleteOrder,
    setCurrentOrder,
    removeErrors,
  } = props;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(0);
  const matches = useMediaQuery("(min-height:800px)");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, myOrders.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    if (matches) {
      setRowsPerPage(10);
    } else {
      setRowsPerPage(5);
    }
  }, [matches]);

  //willUnmount
  useEffect(() => {
    return () => {
      removeErrors(["GET_ORDERS", "DELETE_ORDER"]);
    };
  }, [removeErrors]);

  const handleDeleteTargetDialogClose = () => {
    setConfirmDialogOpen(false);
    setDeleteTarget(null);
  };
  const handleDeleteTargetDialogOpen = (order) => {
    setConfirmDialogOpen(true);
    setDeleteTarget(order);
  };
  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    props.history.push("/new_order");
  };
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    props.history.push("/orders/view_order");
  };
  const handleCreateNewOrder = () => {
    props.history.push("/new_order");
  };

  const handleDeleteOrder = () => {
    setConfirmDialogOpen(false);
    deleteOrder(deleteTarget._id);
    setDeleteTarget(null);
  };
  const generateOrderPfd = (order) => {
    const title = `Order nº ${order.number}`;
    const columns = [["Code", "Description", "Qty", "Price", "Subtotal"]];

    const rows = order.items.map((elt) => [
      elt.cod,
      elt.descrip,
      elt.quantity,
      elt.price,
      elt.price * elt.quantity,
    ]);
    rows.push([
      "",
      "",
      "",
      {
        content: "Total",
        styles: { fontStyle: "bold" },
      },
      {
        content: order.total,
        styles: { fontStyle: "bold" },
      },
    ]);

    let tableContent = {
      startY: 50,
      head: columns,
      body: rows,
    };

    const data = {
      title,
      fileName: `Order_${order.number}`,
      tableContent,
    };
    generatePdf(data);
  };

  return (
    <Layout>
      <LoadingIndicator isActive={isFetchingOrders}>
        <ErrorBoundary
          error={errorGetOrders}
          onRetry={getOrders}
          message="We could not load resources."
        >
          <ConfirmationDialog
            open={confirmDialogOpen}
            title="Confirmation"
            content={
              <span>
                {"Do you really want to remove order number "}
                <b>{deleteTarget && deleteTarget.number}</b>
                {" from your list?"}
              </span>
            }
            onClose={handleDeleteTargetDialogClose}
            onConfirm={handleDeleteOrder}
          />
          <div className={classes.root}>
            <Container maxWidth="md" className={classes.container}>
              <Hidden lgUp>
                <PageHeader title="Orders" />
              </Hidden>

              <Paper elevation={2} className={classes.paper}>
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                    Orders
                  </Typography>
                  <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    onClick={handleCreateNewOrder}
                  >
                    New order
                  </Button>
                </Toolbar>

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
                              {moment(order.updatedAt).format(
                                "DD/MM/YYYY  h:mm a"
                              )}
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
                                      onClick={() => generateOrderPfd(order)}
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
                          <TableRow
                            style={{ height: 52.8 * (rowsPerPage - 1) }}
                          >
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
        </ErrorBoundary>
      </LoadingIndicator>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  myOrders: state.orders.myOrders,
  isFetchingOrders: state.loading["GET_ORDERS"],
  errorGetOrders: state.error["GET_ORDERS"],
});

export default connect(mapStateToProps, { ...actions, removeErrors })(Orders);
