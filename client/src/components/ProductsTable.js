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
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

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

const ProductsTable = (props) => {
  const classes = useStyles();
  const { products, handleModalOpen, handleAddProduct } = props;

  const tableHeader = () => (
    <TableRow>
      <TableCell>Code</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Price</TableCell>
      <TableCell className={classes.tableCellIcon}></TableCell>
      {handleAddProduct && (
        <TableCell className={classes.tableCellIcon}></TableCell>
      )}
    </TableRow>
  );
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table size="small" stickyHeader>
        <TableHead>{tableHeader()}</TableHead>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow hover key={product.cod}>
                <TableCell>{product.cod}</TableCell>
                <TableCell>{product.descrip}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className={classes.tableCellIcon}>
                  <Tooltip title="Photo">
                    <IconButton
                      color="default"
                      size="small"
                      onClick={handleModalOpen}
                    >
                      <PhotoCameraOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                {handleAddProduct && (
                  <TableCell className={classes.tableCellIcon}>
                    <Tooltip title="Add item">
                      <IconButton
                        color="default"
                        size="small"
                        onClick={() => handleAddProduct(product)}
                      >
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
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
                No matching products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
