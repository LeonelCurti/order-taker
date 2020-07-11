import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import ProductsTable from "../components/ProductsTable";
import OrderTable from "../components/OrderTable";
import ImageModal from "../components/ImageModal";
import FetchError from "../components/hoc/FetchError";
import { makeStyles } from "@material-ui/core/styles";
import * as orderActions from "../store/actions/orders";
import * as productActions from "../store/actions/products";
import CircularLoader from "../components/CircularLoader";
import {
  loadingSelector,
  errorMessageSelector,
} from "../store/selector/index";

import {
  CircularProgress,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  Container,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  productsListContainer: {
    overflowX: "auto",
    height: "calc(100% - 49px)",
  },
  orderItemsContainer: {
    overflowX: "auto",
    height: "calc(100% - 48px - 2px - 52px )",
  },
  buttonWrapper: {
    position: "relative",
  },
  buttonProgress: {
    // color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const NewOrder = (props) => {
  const {
    products,
    currentOrder,
    getPriceList,
    createOrder,
    clearCurrentOrder,
    submitOrder,
    updateOrder,
    setCurrentOrder,
    isFetchingProducts,
    isCreatingOrder,
    isSubmitting,
    isUpdatigOrder,
    error,
    updateError,
  } = props;
  const [searchField, setSearchField] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getPriceList();
  }, [getPriceList]);

  useEffect(() => {
    //if currentOrder is null, create new order
    //else if current comes with an order, continue editing order
    if (!currentOrder) {
      createOrder();
    }
  }, [createOrder, currentOrder]);

  //willUnmount
  useEffect(() => {
    return () => {
      clearCurrentOrder();
    };
  }, [clearCurrentOrder]);

  const handleSearchInputChange = (e) => {
    setSearchField(e.target.value.trim());
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.cod.includes(searchField) ||
      product.descrip.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleAddItem = (newItem) => {
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

  const handleRemoveItem = (itemCode) => {
    const updatedOrderItems = currentOrder.items.filter(
      (item) => item.cod !== itemCode
    );
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

  const changeItemQuantity = (e, product) => {
    const qtyValue = Number(e.target.value);
    //if qtyValue < 0 do not update
    if (qtyValue >= 0) {
      const updatedOrderItems = currentOrder.items.map((item) => {
        if (item.cod === product.cod) {
          item.quantity = qtyValue;
        }
        return item;
      });
      handleUpdateOrder(updatedOrderItems);
    }
  };

  const calculateOrderTotal = (itemList) => {
    return itemList
      .reduce((accum, item) => accum + item.quantity * item.price, 0)
      .toFixed(2);
  };

  const handleSubmitOrder = () => {
    if (currentOrder.items.length <= 0) {
      alert("Order can not be empty");
    } else {
      const updatedOrder = {
        ...currentOrder,
        state: "submitted",
      };
      submitOrder(updatedOrder, props.history);
    }
  };
  const handleModalOpen = () => {
    setShowPhoto(true);
  };

  const handleModalClose = () => {
    setShowPhoto(false);
  };
  const refreshPage = () => {};

  return (
    <Layout>
      {isFetchingProducts || isCreatingOrder ? (   
          <CircularLoader />    
      ) : error || !currentOrder ? (
        <FetchError message={error} onRetry={refreshPage} />
      ) : (
        <Fragment>
          <ImageModal open={showPhoto} onClose={handleModalClose} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={2} className={classes.fixedHeight}>
              <Grid item xs={12} sm={6} className={classes.fixedHeight}>
                <Paper className={classes.fixedHeight}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
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
                        "Changes not saved"
                      ) : (
                        "Order saved"
                      )}
                    </Box>
                  </Box>
                  <Divider />
                  <Box className={classes.orderItemsContainer}>
                    <OrderTable
                      order={currentOrder}
                      handleRemoveItem={handleRemoveItem}
                      changeItemQuantity={changeItemQuantity}
                    />
                  </Box>
                  <Divider />
                  <div className={classes.actions}>
                    <Box mr={1}>
                      <Typography variant="body1">
                        {`Total:  ${currentOrder.total}`}
                      </Typography>
                    </Box>
                    <div className={classes.buttonWrapper}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmitOrder}
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                      {isSubmitting && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} className={classes.fixedHeight}>
                <Paper className={classes.fixedHeight}>
                  <SearchInput
                    onChange={handleSearchInputChange}
                    placeholder="Search products"
                  />
                  <Divider />
                  <Box className={classes.productsListContainer}>
                    <ProductsTable
                      products={filteredProducts}
                      handleAddProduct={handleAddItem}
                      handleModalOpen={handleModalOpen}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  products: state.catalog.products,
  currentOrder: state.orders.currentOrder,
  isCreatingOrder: loadingSelector(["CREATE_ORDER"], state),
  isFetchingProducts: loadingSelector(["GET_PRICE_LIST"], state),
  isSubmitting: loadingSelector(["SUBMIT_ORDER"], state),
  isUpdatigOrder: loadingSelector(["UPDATE_ORDER"], state),
  error: errorMessageSelector(["GET_PRICE_LIST", "CREATE_ORDER"], state),
  updateError: errorMessageSelector(['UPDATE_ORDER'], state),
});

const dispatchActionsToProps = { ...orderActions, ...productActions };

export default connect(mapStateToProps, dispatchActionsToProps)(NewOrder);
