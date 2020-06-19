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
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    padding: theme.spacing(2),
    height: "100%",  
  },
  flexCard: {
    flexGrow: '1',
    margin: "0 5px",
    height: "100%",
    maxWidth: "100%", 
  },
  searchInput: {
    height: "42px",
    margin: theme.spacing(1),
  },
  title: {
    padding: theme.spacing(1),
    height: "42px",
    marginBottom: theme.spacing(2),
  },
  centerMe: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  cardContent: {
    padding: 0,
    height: "77%", //stop table just before card actions
  },
  actions: {
    justifyContent: "flex-end",
    "& > :not(:first-child)": {
      //every element which is not the first-child
      marginLeft: theme.spacing(3),
    },
  },
  //test
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
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
    //perform updateOrder action
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

          <div className={classes.flexContainer}>
            <div>
              <Card className={classes.flexCard}>
                <CardHeader title={`Order Number: ${currentOrder.number}`} />
                <Divider />
                <CardContent className={classes.cardContent}>
                  <OrderTable
                    order={currentOrder}
                    handleRemoveItem={handleRemoveItem}
                    changeItemQuantity={changeItemQuantity}
                  />
                </CardContent>
                <Divider />
                <CardActions className={classes.actions}>
                  <Typography variant="subtitle1">
                    {`Total:  ${currentOrder.total}`}
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmitOrder}
                  >
                    Submit
                  </Button>
                </CardActions>
              </Card>
            </div>
            <Card className={classes.flexCard}>
              <div className={classes.searchInput}>
                <SearchInput
                  onChange={handleSearchInputChange}
                  placeholder="Search products"
                />
              </div>
              <ProductsTable
                products={productsToShow()}
                handleAddProduct={handleAddItem}
                handleModalOpen={handleModalOpen}
              />
            </Card>
          </div>


        </Fragment>
      ) : (
        <div className={classes.centerMe}>
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
