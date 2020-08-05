import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Layout from "../components/layout/Layout";
import StatusBullet from "../components/StatusBullet";
import FetchError from "../components/hoc/FetchError";
import CircularLoader from "../components/CircularLoader";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import * as actions from "../redux/actions/orders";
import { removeErrors } from "../redux/actions/error";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: "100%",
  },
  tableCellIcon: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  tableContainer: {
    height: "100%",
    overflow: "auto",
  },
}));
const statusColors = {
  received: "success",
  open: "info",
  submitted: "warning",
};

const MyOrders = (props) => {
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

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  //willUnmount
  useEffect(() => {
    return () => {
      removeErrors(["GET_ORDERS", "DELETE_ORDER"]);
    };
  }, [removeErrors]);

  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    props.history.push("/new_order");
  };
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    props.history.push("/my_orders/view_order");
  };
  const handleDeleteOrder = (order_id) => {
    deleteOrder(order_id);
  };

  return (
    <Layout>
      {isFetchingOrders ? (
        <CircularLoader />
      ) : errorGetOrders ? (
        <FetchError message='We could not load resources.' onRetry={getOrders} />
      ) : (
        <Container maxWidth="md" className={classes.container}>
          <Paper className={classes.tableContainer}>
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
                        {moment(order.updatedAt).format("DD/MM/YYYY  h:mm a")}
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
                                onClick={() => handleDeleteOrder(order._id)}
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
          </Paper>
        </Container>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  myOrders: state.orders.myOrders,
  isFetchingOrders: state.loading["GET_ORDERS"],
  errorGetOrders: state.error["GET_ORDERS"],
});

export default connect(mapStateToProps, { ...actions, removeErrors })(MyOrders);
