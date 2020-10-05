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
import EnhancedTableToolbar from "../components/EnhancedTableToolbar";
const useStyles = makeStyles((theme) => ({
  container: {
    // border: "1px solid purple",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  content: {
    flex: "1",
    // border: "1px solid green",
    height: "80%",
  },
  paper: {
    height: "100%",
  },
  table: {
    height: "calc(100% - 64px)",
    // overflow: "auto",
  },
  tableCellIcon: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  status: {
    marginRight: theme.spacing(1),
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

  useEffect(() => {
    getOrders();
  }, [getOrders]);

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
  const handleDeleteOrder = () => {
    setConfirmDialogOpen(false);
    deleteOrder(deleteTarget._id);
    setDeleteTarget(null);
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
          <Container maxWidth="md" className={classes.container}>
            <PageHeader title="Orders" />
            <div className={classes.content}>
              <Paper className={classes.paper}>
                <EnhancedTableToolbar title="Table Title" />
                <TableContainer className={classes.table}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Nº</TableCell>
                        <TableCell>Last update</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell>State</TableCell>
                        <TableCell align="center" colSpan={3}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myOrders.length > 0 ? (
                        myOrders.map((order) => (
                          <TableRow hover key={order.number}>
                            <TableCell align="right">{order.number}</TableCell>
                            <TableCell>
                              {moment(order.updatedAt).format(
                                "DD/MM/YYYY  h:mm a"
                              )}
                            </TableCell>
                            <TableCell align="right">{order.total}</TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <StatusBullet
                                  className={classes.status}
                                  color={statusColors[order.state]}
                                  size="sm"
                                />
                                <span>{order.state}</span>
                              </Box>
                            </TableCell>
                            <TableCell className={classes.tableCellIcon}>
                              <Tooltip title="Print">
                                <div>
                                  <IconButton
                                    disabled={order.state === "open"}
                                    color="default"
                                    size="small"
                                  >
                                    <PrintOutlinedIcon />
                                  </IconButton>
                                </div>
                              </Tooltip>
                            </TableCell>

                            {order.state === "open" ? (
                              <Fragment>
                                <TableCell className={classes.tableCellIcon}>
                                  <Tooltip title="Edit">
                                    <IconButton
                                      color="default"
                                      size="small"
                                      onClick={() => handleEditOrder(order)}
                                    >
                                      <EditOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                                <TableCell className={classes.tableCellIcon}>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      color="default"
                                      size="small"
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
                                <TableCell className={classes.tableCellIcon}>
                                  <Tooltip title="View">
                                    <IconButton
                                      color="default"
                                      size="small"
                                      onClick={() => handleViewOrder(order)}
                                    >
                                      <VisibilityOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                                <TableCell></TableCell>
                              </Fragment>
                            )}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow style={{ height: 49 }}>
                          <TableCell
                            style={{
                              textAlign: "center",
                            }}
                            colSpan={7}
                          >
                            No orders found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </Container>
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
