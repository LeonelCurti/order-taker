import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPriceList } from "../redux/actions/products";
import { removeErrors } from "../redux/actions/error";
import Layout from "../components/layout/Layout";
import CatalogTable from "../components/CatalogTable";
import ErrorBoundary from "../components/ErrorBoundary";
import PageHeader from "../components/PageHeader";
import LoadingIndicator from "../components/LoadingIndicator";
import { Container, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // border: "1px solid purple",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    // [theme.breakpoints.up("lg")]: {
    //   height: "100%",
    // },
  },
  content: {
    flex: "1",
    // border: "1px solid green",
    height:'calc(100% - 92.8px)',
    [theme.breakpoints.up("lg")]: {
      height: "100%",
    },   
  },
}));

const ProductList = (props) => {
  const classes = useStyles();
  const { getPriceList, error, isFetchingProducts, removeErrors } = props;

  useEffect(() => {
    getPriceList();
  }, [getPriceList]);

  //willUnmount
  useEffect(() => {
    return () => {
      removeErrors(["GET_PRICE_LIST"]);
    };
  }, [removeErrors]);

  const onRetry = () => getPriceList();

  return (
    <Layout>
      <LoadingIndicator isActive={isFetchingProducts}>
        <ErrorBoundary
          error={error}
          onRetry={onRetry}
          message="We could not load resources."
        >
          <Container maxWidth="md" className={classes.container}>
            <Hidden lgUp>
              <PageHeader title="Catalog" />
            </Hidden>
            <div className={classes.content}>
              <CatalogTable />
            </div>
          </Container>
        </ErrorBoundary>
      </LoadingIndicator>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isFetchingProducts: state.loading["GET_PRICE_LIST"],
  error: state.error["GET_PRICE_LIST"],
});

export default connect(mapStateToProps, { getPriceList, removeErrors })(
  ProductList
);
