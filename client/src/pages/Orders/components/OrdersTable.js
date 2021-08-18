import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  IconButton,
  TableContainer,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { generateOrderPdf } from "../../../utils/generatePdf";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import StatusBullet from "../../../components/StatusBullet";

const statusColors = {
  received: "success",
  open: "info",
  submitted: "warning",
};

const useStyles = makeStyles((theme) => ({
  status: {
    marginRight: theme.spacing(1),
  },
  actionIcon: {
    paddingRight: "30px",
  },
  tableCellIcon: {
    width: 80,
  },
  title: {
    flexGrow: 1,
  },
}));

const OrdersTable = (props) => {
  const classes = useStyles();
  const { orders, onEditOrder, onViewOrder, onDeleteOrder } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
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
          {orders.length > 0 ? (
            (rowsPerPage > 0
              ? orders.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : orders
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
                          onClick={() => onEditOrder(order)}
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
                          onClick={() => onDeleteOrder(order)}
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
                          onClick={() => generateOrderPdf(order)}
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
                          onClick={() => onViewOrder(order)}
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
              <TableRow style={{ height: 52.8 * (rowsPerPage - 1) }}>
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
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
