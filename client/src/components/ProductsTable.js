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
} from "@material-ui/core";

import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {},
  tableCellIcon: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

const ProductsTable = (props) => {
  const classes = useStyles();
  const { products, handleModalOpen, handleAddProduct } = props; 

  return (
    <div className={classes.root}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell colSpan={handleAddProduct ? 2 : 1}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow hover key={product.cod}>
                <TableCell>{product.cod}</TableCell>
                <TableCell>{product.descrip}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell>
                  <Tooltip title="Photo">
                    {/* <SomeContent /> */}
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
                        <AddCircleOutlineIcon />
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
    </div>
  );
};

export default ProductsTable;
