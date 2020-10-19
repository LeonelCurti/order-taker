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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflow: "auto",
  },
  tableCellIcon: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  table: {
    minWidth: 650,
  },
  title: {
    flexGrow: 1,
  },
}));

const CatalogTable = (props) => {
  const classes = useStyles();
  const { products, onShowProduct } = props;

  return (
    <div className={classes.root}>
      <Table size="small" stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell></TableCell>
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
                    <IconButton
                      color="default"
                      size="small"
                      onClick={() => onShowProduct(product)}
                    >
                      <PhotoCameraOutlinedIcon />
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
                No matching products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CatalogTable;
