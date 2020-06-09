import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import { makeStyles } from "@material-ui/core/styles";
import ProductsTable from "../components/ProductsTable";
import OrderTable from "../components/OrderTable";
import Typography from "@material-ui/core/Typography";
import ImageModal from "../components/ImageModal";
import {
  getPriceList,
  createNewOrder,
  clearCurrentOrder,
  setCurrentOrder,
  updateOrder,
} from "../store/actions/orders";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  myOrders: {
    display: "flex",
    padding: theme.spacing(2),
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: "0 5px",
  },
  searchInput: {
    height: "42px",
    marginBottom: theme.spacing(2),
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
}));

const NewOrder = (props) => {
  const {
    getPriceList,
    createNewOrder,
    clearCurrentOrder,
    // setCurrentOrder,
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
    //if current comes with a value, continue editing order
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

  const onChange = (e) => {
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

    //update order
    const updatedOrder = {
      ...currentOrder,
      items: [item, ...currentOrder.items],
    };
    updateOrder(updatedOrder);

    //focus quantity selection
  };
  const handleRemoveItem = (itemCode) => {
    const updatedOrder = {
      ...currentOrder,
      items: currentOrder.items.filter((item) => item.cod !== itemCode),
    };
    updateOrder(updatedOrder);
  };

  const handleModalOpen = () => {
    setShowPhoto(true);
  };

  const handleModalClose = () => {
    setShowPhoto(false);
  };

  return (
    <Layout>
      {currentOrder && products ? (
        <Fragment>
          <ImageModal open={showPhoto} onClose={handleModalClose} />
          <div className={classes.myOrders}>
            <div className={classes.container}>
              <div className={classes.title}>
                <Typography variant="h5" gutterBottom>
                  Order n° {currentOrder.number}
                </Typography>
              </div>
              <OrderTable
                order={currentOrder}
                handleRemoveItem={handleRemoveItem}
              />
            </div>
            <div className={classes.container}>
              <div className={classes.searchInput}>
                <SearchInput
                  onChange={onChange}
                  placeholder="Search products"
                />
              </div>
              <ProductsTable
                products={productsToShow()}
                handleAddProduct={handleAddItem}
                handleModalOpen={handleModalOpen}
              />
            </div>
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
  setCurrentOrder,
  updateOrder,
})(NewOrder);
