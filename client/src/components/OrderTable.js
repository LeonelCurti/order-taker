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
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
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
}));

const sampleOrder = 
  {
    id: 5607498,
    createdAt: "2020-05-19T00:14:07+0000",
    updatedAt: "2020-05-19T00:14:12+0000",
    items: [
      {
        id: 1469335,
        cod: "002003",
        descrip: "ABRAZADERA CREMALLERA",
        price: 34.26,
        quantity: 1,  
      },
    ],
    notes: "",
    state: "open",
    number: 133679,
  }


const OrderTable = (props) => {
  const classes = useStyles();
  const { handleRemoveItem } = props;

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
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>{tableHeader()}</TableHead>
        <TableBody>
          {sampleOrder.items.length > 0 ? (
            sampleOrder.items.map((product,i) => (
              <TableRow hover key={product.cod}>
                <TableCell>{product.cod}</TableCell>
                <TableCell>{product.descrip}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity * product.price}</TableCell>
                <TableCell className={classes.tableCellIcon}>
                  <Tooltip title="Remove">
                    <IconButton
                      color="default"
                      size="small"
                      onClick={handleRemoveItem}
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
                colSpan={4}
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
