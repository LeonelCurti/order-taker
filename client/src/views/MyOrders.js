import React, { Fragment, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { getMyOrders } from "../store/actions/orders";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { deleteOrder } from "../store/actions/orders";

const useStyles = makeStyles((theme) => ({
  productList: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: "0 auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      width: "82.5%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "70%",
    },
    height: "100%",
  },
  tableContainer: {
    height: "100%",
    // display:'block',
    // height: "80%",
    // overflowY: "auto",
  },
  tableCellIcon: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  centerMe: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const MyOrders = (props) => {
  const classes = useStyles();
  const {
    getMyOrders,
    deleteOrder,
    orders: { myOrders },
  } = props;

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  const tableHeader = () => (
    <TableRow>
      <TableCell>Number</TableCell>
      <TableCell>Last update</TableCell>
      <TableCell>Total</TableCell>
      <TableCell>State</TableCell>
      <TableCell></TableCell> {/*print icon */}
      <TableCell></TableCell> {/*view or edit order */}
      <TableCell></TableCell> {/*delete order */}
    </TableRow>
  );

  const handleDeleteOrder = (order_id)=>{
    deleteOrder(order_id);
    getMyOrders();
  }

  return (
    <Layout>
      {myOrders ? (
        <div className={classes.productList}>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>{tableHeader()}</TableHead>
              <TableBody>
                {myOrders.length > 0 ? (
                  myOrders.map((order) => (
                    <TableRow hover key={order.number}>
                      <TableCell>{order.number}</TableCell>
                      <TableCell>{order.updatedAt}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>{order.state}</TableCell>
                      <TableCell className={classes.tableCellIcon}>
                        <Tooltip title="Print">
                          <IconButton
                            disabled={order.state !== "closed"}
                            color="default"
                            size="small"
                          >
                            <PrintOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>

                      {order.state === "open" ? (
                        <Fragment>
                          <TableCell className={classes.tableCellIcon}>
                            <Tooltip title="Edit">
                              <IconButton color="default" size="small">
                                <EditOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell className={classes.tableCellIcon}>
                            <Tooltip title="Delete">
                              <IconButton color="default" size="small" onClick={()=>handleDeleteOrder(order._id)}>
                                <DeleteForeverIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <TableCell className={classes.tableCellIcon}>
                            <Tooltip title="View">
                              <IconButton color="default" size="small">
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
        </div>
      ) : (
        <div className={classes.centerMe}>
          <CircularProgress />
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, { getMyOrders, deleteOrder })(MyOrders);
