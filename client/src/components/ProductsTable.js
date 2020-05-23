import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import ImageModal from './ImageModal'

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    // display:'block',
    // height: "80%",
    // overflowY: "auto",
  },
}));

const ProductsTable = (props) => {
  const classes = useStyles();
  const { products } = props;
  const [open, setOpen] = React.useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };
  
  

  return (
    <Fragment>
      <ImageModal open={open} onClose={handleModalClose} />      
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow hover key={product.cod}>
                  <TableCell>{product.cod}</TableCell>
                  <TableCell>{product.descrip}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <IconButton
                      color="default"
                      size="small"
                      onClick={handleModalOpen}
                    >
                      <PhotoCameraOutlinedIcon />
                    </IconButton>
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
      </TableContainer>
    </Fragment>
  );
};

export default ProductsTable;
