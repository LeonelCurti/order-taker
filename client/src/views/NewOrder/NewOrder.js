import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import ProductsTable from "./components/ProductsTable";
import OrderTable from "./components/OrderTable";
import { makeStyles } from "@material-ui/core/styles";
import { createOrder, setCurrentOrder } from "../../redux/actions/orders";
import { getPriceList } from "../../redux/actions/products";
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentOrder = useSelector((state) => state.orders.currentOrder);
  const isCreatingOrder = useSelector((state) => state.orders.isCreatingOrder);
  const isFetchingPriceList = useSelector((state) => state.catalog.isFetching);
  const priceListError = useSelector((state) => state.catalog.errorMessage);

  useEffect(() => {
    dispatch(getPriceList());
  }, [dispatch]);

  useEffect(() => {
    //if currentOrder is null, create new order
    //else if current comes with an order, continue editing order
    if (!currentOrder) {
      dispatch(createOrder());
    }
  }, [dispatch, currentOrder]);

  //willUnmount
  useEffect(() => {
    return () => {
      dispatch(setCurrentOrder(null)); 
    };
  }, [dispatch]);

  const refreshPage = () => {
    props.history.replace("/");
  };

  return (
    <Layout>
      <LoadingIndicator isActive={isFetchingPriceList || isCreatingOrder}>
        <ErrorBoundary
          error={priceListError || !currentOrder}      
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

export default NewOrder;

