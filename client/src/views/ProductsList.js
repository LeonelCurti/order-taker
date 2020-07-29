import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPriceList } from "../store/actions/products";
import { removeErrors } from "../store/actions/error";
import Layout from "../components/layout/Layout";
import ProductsTable from "../components/ProductsTable";
import FetchError from "../components/hoc/FetchError";
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
      {isFetchingProducts ? (
        <CircularLoader />
      ) : error ? (
        <FetchError message={error} onRetry={onRetry} />
      ) : (
        <Container maxWidth="md" className={classes.container}>
          <ProductsTable />
        </Container>
      )}
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
