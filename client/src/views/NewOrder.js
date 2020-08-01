import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import ProductsTable from "../components/ProductsTable";
import OrderTable from "../components/OrderTable";
import FetchError from "../components/hoc/FetchError";
import { makeStyles } from "@material-ui/core/styles";
import { createOrder, setCurrentOrder } from "../redux/actions/orders";
import { getPriceList } from "../redux/actions/products";
import CircularLoader from "../components/CircularLoader";
import { 
  // errorMessageSelector,
  hasErrors 
} from "../redux/selector/index";
import {removeErrors} from '../redux/actions/error'

import { Grid, Container } from "@material-ui/core";

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
    currentOrder,
    getPriceList,
    createOrder,
    setCurrentOrder,
    error,
    isFetchingPriceList,
    isCreatingOrder,
  } = props;
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
      setCurrentOrder(null);
      removeErrors(["GET_PRICE_LIST","CREATE_ORDER"])
    };
  }, [setCurrentOrder]);

  const refreshPage = () => {};

  return (
    <Layout>
      {isFetchingPriceList || isCreatingOrder ? (
        <CircularLoader />
      ) : error || !currentOrder ? (
        <FetchError message={'Something went wrong.'} onRetry={refreshPage} />
      ) : (
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2} className={classes.fixedHeight}>
            <Grid item xs={12} sm={6} className={classes.fixedHeight}>
              <OrderTable />
            </Grid>

            <Grid item xs={12} sm={6} className={classes.fixedHeight}>
              <ProductsTable addProductOn />
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  currentOrder: state.orders.currentOrder,
  isFetchingPriceList: state.loading["GET_PRICE_LIST"],
  isCreatingOrder: state.loading["CREATE_ORDER"],
  error: hasErrors(["GET_PRICE_LIST", "CREATE_ORDER"], state), 
});

const mapDispatchToProps = {
  setCurrentOrder,
  createOrder,
  getPriceList,
  hasErrors,
  removeErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
