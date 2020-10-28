import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../components/layout/Layout";
import ProductsTable from "./components/ProductsTable";
import OrderTable from "./components/OrderTable";
import { makeStyles } from "@material-ui/core/styles";
import { createOrder, setCurrentOrder } from "../../redux/actions/orders";
import { getPriceList } from "../../redux/actions/products";
import { hasErrors } from "../../redux/selector/index";
import { removeErrors } from "../../redux/actions/error";
import PageHeader from "../../components/PageHeader";
import ErrorBoundary from "../../components/ErrorBoundary";
import LoadingIndicator from "../../components/LoadingIndicator";
import { Grid, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({ 
  container: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
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
          <div className={classes.container}>
            <Hidden lgUp>
              <PageHeader title="New Order" />
            </Hidden>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <OrderTable />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ProductsTable />
              </Grid>
            </Grid>
          </div>        
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
