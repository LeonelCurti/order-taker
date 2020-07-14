import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPriceList } from "../store/actions/products";
import Layout from "../components/layout/Layout";
import ProductsTable from "../components/ProductsTable";
import FetchError from "../components/hoc/FetchError";
import { errorMessageSelector, loadingSelector } from "../store/selector/index";
import CircularLoader from "../components/CircularLoader";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: "100%",
  },
}));

const ProductList = (props) => {
  const classes = useStyles();
  const { getPriceList, products, error, isFetchingProducts } = props; 

  useEffect(() => {
    getPriceList();
  }, [getPriceList]);

  return (
    <Layout>
      {isFetchingProducts ? (
        <CircularLoader />
      ) : error ? (
        <FetchError message={error} onRetry={getPriceList} />
      ) : (
        <Container maxWidth="md" className={classes.container}>
          <ProductsTable products={products} />
        </Container>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  products: state.catalog.products,
  isFetchingProducts: loadingSelector(["GET_PRICE_LIST"], state),
  error: errorMessageSelector(["GET_PRICE_LIST"], state),
});

export default connect(mapStateToProps, { getPriceList })(ProductList);
