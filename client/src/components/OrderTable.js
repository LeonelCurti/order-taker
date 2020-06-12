import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    // display:'block',
    // height: "80%",
    // overflowY: "auto",
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      width: "8ch",
    },
  },
  tableCellIcon: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

const OrderTable = (props) => {
  const classes = useStyles();
  const { order, handleRemoveItem,changeItemQuantity } = props;

  const tableHeader = () => (
    <TableRow>
      <TableCell>Code</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Qty</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Subtotal</TableCell>
      <TableCell className={classes.tableCellIcon}></TableCell>
    </TableRow>
  );

  const handleOnBlur = () => {
    console.log("onblur: save order");
  };
  

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>{tableHeader()}</TableHead>
        <TableBody>
          {order.items.length > 0 ? (
            order.items.map((product, i) => (
              <TableRow hover key={product.cod}>
                <TableCell>{product.cod}</TableCell>
                <TableCell>{product.descrip}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    value={product.quantity}
                    onBlur={handleOnBlur}
                    onChange={(e)=>changeItemQuantity(e,product)}
                  />
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  {(product.quantity * product.price).toFixed(2)}
                </TableCell>
                <TableCell className={classes.tableCellIcon}>
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
    </TableContainer>
  );
};

export default OrderTable;
