import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import ProductsTable from "../../components/ProductsTable";
import OrderTable from "../../components/OrderTable";
import { makeStyles } from "@material-ui/core/styles";
import { createOrder, setCurrentOrder } from "../../redux/actions/orders";
import { getPriceList } from "../../redux/actions/products";
import { hasErrors } from "../../redux/selector/index";
import { removeErrors } from "../../redux/actions/error";
import PageHeader from "../../components/PageHeader";
import ErrorBoundary from "../../components/ErrorBoundary";
import LoadingIndicator from "../../components/LoadingIndicator";
import { Grid, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    // border: "1px solid purple",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  content: {
    flex: "1",
    // border: "1px solid green",    
    maxHeight: "85%",
  },
  fixedHeight: {
    height: "100%",
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
      removeErrors(["GET_PRICE_LIST", "CREATE_ORDER"]);
    };
  }, [setCurrentOrder]);

  const refreshPage = () => {
    props.history.replace("/");
  };

  return (
    <Layout>
      <LoadingIndicator isActive={isFetchingPriceList || isCreatingOrder}>
        <ErrorBoundary
          error={error || !currentOrder}
          onRetry={refreshPage}
          message="We could not load resources."
        >
          <Container className={classes.container}>
            <PageHeader title="New Order" />
            <div className={classes.content}>
              <Grid container spacing={2} className={classes.fixedHeight}>
                <Grid item xs={12} sm={6} className={classes.fixedHeight}>
                  <OrderTable />
                </Grid>

                <Grid item xs={12} sm={6} className={classes.fixedHeight}>
                  <ProductsTable addProductOn />
                </Grid>
              </Grid>
            </div>
          </Container>
        </ErrorBoundary>
      </LoadingIndicator>
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
  removeErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrder);
