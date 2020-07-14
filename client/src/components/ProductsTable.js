import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as orderActions from "../store/actions/orders";
import {
  Table,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  TableRow,
  Tooltip,
  Divider,
  Box,
  Paper,
} from "@material-ui/core";
import SearchInput from "./SearchInput";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ImageModal from "./ImageModal";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  tableCellIcon: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  tableContainer: {
    overflowX: "auto",
    //100% - divider 1 - searchInput 48 = rest for table
    height: "calc(100% - 49px)",
  },
  fixedPaperHeight: {
    height: "100%",
  },
}));

const ProductsTable = (props) => {
  const classes = useStyles();
  const { 
    products, 
    addProductOn, 
    setCurrentOrder,
    updateOrder,
    currentOrder,
  } = props;
  const [searchField, setSearchField] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);

  const onChange = (e) => {
    setSearchField(e.target.value.trim());
  };
  const handleModalOpen = () => {
    setShowPhoto(true);
  };

  const handleModalClose = () => {
    setShowPhoto(false);
  };
  
  const filteredProducts = products.filter((product) => {
    return (
      product.cod.includes(searchField) ||
      product.descrip.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleAddProduct = (newItem) => {
    newItem.quantity = Math.floor(Math.random() * 10) + 1;
    newItem.id = 1469335; //default item category for now

    //check if item already exist
    const alreadyInList = currentOrder.items.some(
      (orderItem) => orderItem.cod === newItem.cod
    );
    if (alreadyInList) {
      alert("Item already added");
      return;
    }
    //add item into the list
    const updatedOrderItems = [newItem, ...currentOrder.items];

    handleUpdateOrder(updatedOrderItems);
  };

  const handleUpdateOrder = (updatedOrderItems) => {
    const updatedOrder = {
      ...currentOrder,
      items: updatedOrderItems,
      total: calculateOrderTotal(updatedOrderItems),
    };
    //update currentOrder locally
    setCurrentOrder(updatedOrder);
    //update order in database
    updateOrder(updatedOrder);
  };

  const calculateOrderTotal = (itemList) => {
    return itemList
      .reduce((accum, item) => accum + item.quantity * item.price, 0)
      .toFixed(2);
  };

  return (
    <div className={classes.root}>
      <ImageModal open={showPhoto} onClose={handleModalClose} />
      <Paper className={classes.fixedPaperHeight}>
        <SearchInput onChange={onChange} placeholder="Search products" />
        <Divider />
        <Box className={classes.tableContainer}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell colSpan={addProductOn ? 2 : 1}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow hover key={product.cod}>
                    <TableCell>{product.cod}</TableCell>
                    <TableCell>{product.descrip}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell>
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
                    {addProductOn && (
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
        </Box>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentOrder: state.orders.currentOrder,
  products: state.catalog.products,  
});


export default connect(mapStateToProps, orderActions)(ProductsTable);
