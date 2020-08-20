import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPriceList } from "../redux/actions/products";
import { removeErrors } from "../redux/actions/error";
import Layout from "../components/layout/Layout";
import ProductsTable from "../components/ProductsTable";
import FetchError from "../components/hoc/FetchError";
import PageHeader from "../components/PageHeader";
import CircularLoader from "../components/CircularLoader";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // border: "1px solid purple",
    display: "flex",
    flexDirection: "column",
    // paddingLeft: theme.spacing(3),
    // paddingRight: theme.spacing(3),
    height: "100%",
  },
  content: {
    flex: "1",
    // border: "1px solid green",
    paddingBottom: theme.spacing(2),
    height: "50%",
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
        <FetchError message="We could not load resources." onRetry={onRetry} />
      ) : (
        <Container className={classes.container}>
          <PageHeader title="Catalog" className={classes.pageHeader} />
          <div className={classes.content}>
            <ProductsTable />
          </div>
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
