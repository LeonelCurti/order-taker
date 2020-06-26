import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import ProductsTable from "../components/ProductsTable";
import OrderTable from "../components/OrderTable";
import ImageModal from "../components/ImageModal";
import { makeStyles } from "@material-ui/core/styles";
import {
  getPriceList,
  createNewOrder,
  clearCurrentOrder,
  updateOrder,
  submitOrder,
} from "../store/actions/orders";
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
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  productsListContainer: {
    overflowX: "auto",
    height: "calc(100% - 49px)",
  },
  orderItemsContainer: {
    overflowX: "auto",
    height:"calc(100% - 48px - 2px - 52px )"
  },
}));

const NewOrder = (props) => {
  const {
    getPriceList,
    createNewOrder,
    clearCurrentOrder,
    submitOrder,
    updateOrder,
    orders: { products, currentOrder },
  } = props;
  const [filterStr, setFilterStr] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!products) {
      getPriceList();
    }
  }, [getPriceList, products]);

  useEffect(() => {
    //if currentOrder is null, create new order
    //else if current comes with an order, continue editing order
    if (!currentOrder) {
      createNewOrder();
    }
  }, [createNewOrder, currentOrder]);

  //willUnmount
  useEffect(() => {
    return () => {
      clearCurrentOrder();
    };
  }, [clearCurrentOrder]);

  const handleSearchInputChange = (e) => {
    setFilterStr(e.target.value.trim());
  };

  const productsToShow = () => {
    if (filterStr !== "") {
      return products.filter((product) => {
        const regex = new RegExp(`${filterStr}`, "gi");
        return product.cod.match(regex) || product.descrip.match(regex);
      });
    } else {
      return products;
    }
  };

  const handleAddItem = (item) => {
    item.quantity = Math.floor(Math.random() * 10) + 1;
    item.id = 1469335; //default item category for now

    //check if already exist
    const alreadyInList =
      currentOrder.items.filter((orderItem) => orderItem.cod === item.cod)
        .length > 0;
    if (alreadyInList) {
      alert("Item already added");
      return;
    }
    const updatedOrderItems = [item, ...currentOrder.items];

    handleUpdateOrder(updatedOrderItems);
    //focus quantity selection
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
    updateOrder(updatedOrder);
  };

  const changeItemQuantity = (e, product) => {
    const qtyValue = Number(e.target.value);
    //if new val < 0 do not update
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

  const handleModalOpen = () => {
    setShowPhoto(true);
  };

  const handleModalClose = () => {
    setShowPhoto(false);
  };

  const calculateOrderTotal = (items) => {
    return items
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

  return (
    <Layout>
      {currentOrder && products ? (
        <Fragment>
          <ImageModal open={showPhoto} onClose={handleModalClose} />

          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={2} className={classes.fixedHeight}>
              <Grid item xs={12} sm={6} className={classes.fixedHeight}>
                <Paper className={classes.fixedHeight}>
                  <Typography
                    variant="h6"
                    component="h6"
                    className={classes.paperTitle}
                  >
                    {`Order Number: ${currentOrder.number}`}
                  </Typography>
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
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleSubmitOrder}
                    >
                      Submit
                    </Button>
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
                      products={productsToShow()}
                      handleAddProduct={handleAddItem}
                      handleModalOpen={handleModalOpen}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      ) : (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, {
  getPriceList,
  createNewOrder,
  clearCurrentOrder,
  updateOrder,
  submitOrder,
})(NewOrder);
