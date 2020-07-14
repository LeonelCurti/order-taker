import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import ProductsTable from "../components/ProductsTable";
import OrderTable from "../components/OrderTable";
import FetchError from "../components/hoc/FetchError";
import { makeStyles } from "@material-ui/core/styles";
import { createOrder, setCurrentOrder } from "../store/actions/orders";
import { getPriceList } from "../store/actions/products";
import CircularLoader from "../components/CircularLoader";
import { loadingSelector, errorMessageSelector } from "../store/selector/index";

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
    isFetching,
    errorMsg,
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
    };
  }, [setCurrentOrder]);

  const refreshPage = () => {};

  return (
    <Layout>
      {isFetching ? (
        <CircularLoader />
      ) : errorMsg || !currentOrder ? (
        <FetchError message={errorMsg} onRetry={refreshPage} />
      ) : (
        <Fragment>
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
        </Fragment>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  currentOrder: state.orders.currentOrder,
  isFetching: loadingSelector(["GET_PRICE_LIST", "CREATE_ORDER"], state),
  errorMsg: errorMessageSelector(["GET_PRICE_LIST", "CREATE_ORDER"], state),
});

const mapDispatchToProps = {
  setCurrentOrder,
  createOrder,
  getPriceList,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
