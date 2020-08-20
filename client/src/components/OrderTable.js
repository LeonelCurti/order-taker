import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadingSelector, errorMessageSelector } from "../redux/selector/index";
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
import ButtonLoader from "./ButtonLoader";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as orderActions from "../redux/actions/orders";
import { showAlert } from "../redux/actions/alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "8ch",
    },
    height: "100%",
  },
  fixedHeight: {
    height: "100%",
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
  orderItemsContainer: {
    overflowX: "auto",
    height: "calc(100% - 48px - 2px - 52px )",
  },  
}));

const OrderTable = (props) => {
  const classes = useStyles();
  const {
    currentOrder,
    submitOrder,
    updateOrder,
    isUpdatigOrder,
    isSubmitting,
    updateError,
    showAlert,
  } = props;

  const handleRemoveItem = (itemCode) => {
    const updatedOrderItems = currentOrder.items.filter(
      (item) => item.cod !== itemCode
    );
    updateOrder({
      ...currentOrder,
      items: updatedOrderItems,
      total: calculateOrderTotal(updatedOrderItems),
    });
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

      updateOrder({
        ...currentOrder,
        items: updatedOrderItems,
        total: calculateOrderTotal(updatedOrderItems),
      });
    }
  };

  const calculateOrderTotal = (itemList) => {
    return itemList
      .reduce((accum, item) => accum + item.quantity * item.price, 0)
      .toFixed(2);
  };

  const handleSubmitOrder = () => {
    if (currentOrder.items.length <= 0) {
      showAlert("Order can not be empty.");
    } else if (updateError) {
      showAlert("Order could not be submitted.");
    } else {
      submitOrder(
        {
          ...currentOrder,
          state: "submitted",
        },
        props.history
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.fixedHeight}>
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
        <Box className={classes.orderItemsContainer}>
          <Table size="small" stickyHeader>
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
        </Box>
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

const mapStateToProps = (state) => ({
  currentOrder: state.orders.currentOrder,
  isSubmitting: loadingSelector(state, ["SUBMIT_ORDER"]),
  isUpdatigOrder: loadingSelector(state, ["UPDATE_ORDER"]),
  updateError: errorMessageSelector(["UPDATE_ORDER"], state),
});

export default connect(mapStateToProps, { ...orderActions, showAlert })(
  withRouter(OrderTable)
);
