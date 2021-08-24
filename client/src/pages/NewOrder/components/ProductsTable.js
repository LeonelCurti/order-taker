import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as orderActions from "../../../redux/actions/orders";
import {
  Table,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  TableRow,
  Tooltip,
  Divider,
  Paper,
} from "@material-ui/core";
import SearchInput from "./SearchInput";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ImageModal from "../../../components/ImageModal";
import { useModal } from "../../../utils/useModal";
const useStyles = makeStyles((theme) => ({
  root: {},
  tableContainer: {
    overflow: "auto",
    height: 600,
  },
  table: {
    minWidth: 500,
  },
  tableCellIcon: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
}));

const ProductsTable = (props) => {
  const classes = useStyles();
  const { products, updateOrder, currentOrder } = props;
  const [searchField, setSearchField] = useState("");
  const [setIsModalOpened, isModalOpened, modalData, setModalData] = useModal();
  const onChange = (e) => {
    setSearchField(e.target.value.trim());
  };

  const onShowProduct = (product) => {
    setModalData(product.cod);
    setIsModalOpened(true);
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

    updateOrder({
      ...currentOrder,
      items: updatedOrderItems,
      total: calculateOrderTotal(updatedOrderItems),
    });
  };

  const calculateOrderTotal = (itemList) => {
    return itemList
      .reduce((accum, item) => accum + item.quantity * item.price, 0)
      .toFixed(2);
  };

  return (
    <div className={classes.root}>
      <ImageModal
        title={"Product Image"}
        open={isModalOpened}
        url={`https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/${modalData}.jpg`}
        onClose={() => setIsModalOpened(false)}
      />
      <Paper>
        <SearchInput onChange={onChange} placeholder="Search products" />
        <Divider />
        <div className={classes.tableContainer}>
          <Table size="small" stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell colSpan={2}></TableCell>
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
                          onClick={() => onShowProduct(product)}
                        >
                          <PhotoCameraOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
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
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentOrder: state.orders.currentOrder,
  products: state.catalog.products,
});

export default connect(mapStateToProps, orderActions)(ProductsTable);
