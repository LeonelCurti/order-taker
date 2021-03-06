import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  TableRow,
  Tooltip,
  TextField,
  CircularProgress,
  Typography,
  Box,
  Divider,
  Paper,
} from "@material-ui/core";
import ButtonLoader from "../../../components/ButtonLoader";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {submitOrder, updateOrder} from "../../../redux/actions/orders";
import { showAlert } from "../../../redux/actions/alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "8ch",
    },
  }, 
  paper: { },
  tableContainer: {
    overflow: "auto",
    height: 547,
  },
  table: {
    minWidth: 500,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  paperTitle: {
    padding: theme.spacing(1),
  },
}));

const OrderTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentOrder = useSelector((state) => state.orders.currentOrder);
  const isUpdatigOrder = useSelector((state) => state.orders.isUpdating);
  const isSubmitting = useSelector((state) => state.orders.isSubmitting);
  const updateError = useSelector((state) => state.orders.errorMessage);

  const handleRemoveItem = (itemCode) => {
    const updatedOrderItems = currentOrder.items.filter(
      (item) => item.cod !== itemCode
    );
    dispatch(updateOrder({
      ...currentOrder,
      items: updatedOrderItems,
      total: calculateOrderTotal(updatedOrderItems),
    }));
  };

  const changeItemQuantity = (e, product) => {
    const qtyValue = e.target.value;

    if (qtyValue >= 0 && qtyValue < 1000) {
      const updatedOrderItems = currentOrder.items.map((item) => {
        if (item.cod === product.cod) {
          item.quantity = qtyValue;
        }
        return item;
      });

      dispatch(updateOrder({
        ...currentOrder,
        items: updatedOrderItems,
        total: calculateOrderTotal(updatedOrderItems),
      }));
    }
  };

  const calculateOrderTotal = (itemList) => {
    return itemList
      .reduce((accum, item) => accum + item.quantity * item.price, 0)
      .toFixed(2);
  };

  const handleSubmitOrder = () => {
    if (currentOrder.items.length <= 0) {
      dispatch(showAlert("Order can not be empty."));
    } else if (updateError) {
      dispatch(showAlert("Order could not be submitted."));
    } else {
      dispatch(submitOrder(
        {
          ...currentOrder,
          state: "submitted",
        },
        props.history
      ));
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            component="h6"
            className={classes.paperTitle}
          >
            {`Order Number: ${currentOrder.number}`}
          </Typography>
          <Box mr={2}>
            {isUpdatigOrder ? (
              <CircularProgress size={36} />
            ) : updateError ? (
              "Unsaved changes"
            ) : (
              "Saved"
            )}
          </Box>
        </Box>
        <Divider />
        <div className={classes.tableContainer}>
          <Table size="small" stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Code</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrder.items.length > 0 ? (
                currentOrder.items.map((product, i) => (
                  <TableRow hover key={product.cod}>
                    <TableCell>{product.cod}</TableCell>
                    <TableCell padding="none">{product.descrip}</TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={product.quantity}
                        onChange={(e) => changeItemQuantity(e, product)}
                      />
                    </TableCell>
                    <TableCell align="right" padding="none">
                      {product.price}
                    </TableCell>
                    <TableCell align="right">
                      {(product.quantity * product.price).toFixed(2)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCellIcon}
                      align="center"
                      padding="none"
                    >
                      <Tooltip title="Remove">
                        <IconButton
                          color="default"
                          size="small"
                          onClick={() => handleRemoveItem(product.cod)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow style={{ height: 49 }}>
                  <TableCell
                    style={{
                      textAlign: "center",
                    }}
                    colSpan={6}
                  >
                    Please add products
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Divider />
        <div className={classes.actions}>
          <Box mr={1}>
            <Typography variant="body1">
              {`Total:  ${currentOrder.total}`}
            </Typography>
          </Box>
          <ButtonLoader
            isLoading={isSubmitting}
            onClick={handleSubmitOrder}
            text={"Submit"}
          />
        </div>
      </Paper>
    </div>
  );
};

export default withRouter(OrderTable)

