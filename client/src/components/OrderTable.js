import React from "react";
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
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "8ch",
    },
  },
}));

const OrderTable = (props) => {
  const classes = useStyles();
  const { order, handleRemoveItem, changeItemQuantity } = props;

  return (
    <div className={classes.root}>
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
          {order.items.length > 0 ? (
            order.items.map((product, i) => (
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
  );
};

export default OrderTable;
