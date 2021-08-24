import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPriceList } from "../../redux/actions/products";
import { generateCatalogPdf } from "../../utils/generatePdf";
import { Container, Hidden, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout/Layout";
import CatalogTable from "./components/CatalogTable";
import ErrorBoundary from "../../components/ErrorBoundary";
import PageHeader from "../../components/PageHeader";
import LoadingIndicator from "../../components/LoadingIndicator";
import CatalogTableToolbar from "./components/CatalogTableToolbar";

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

const ProductList = () => {
  const classes = useStyles();
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.catalog.products);
  const isFetchingProducts = useSelector((state) => state.catalog.isFetching);
  const error = useSelector((state) => state.catalog.errorMessage);

  const onChange = (value) => {
    setSearchField(value.trim());
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.cod.includes(searchField) ||
      product.descrip.toLowerCase().includes(searchField.toLowerCase())
    );
  });
  useEffect(() => {
    dispatch(getPriceList());
  }, [dispatch]);

  const onDownloadCatalogPdf = () => {
    if (products) {
      generateCatalogPdf(products);
    }
  };

  const onRetry = () => dispatch(getPriceList());

  return (
    <Layout>
      <LoadingIndicator isActive={isFetchingProducts}>
        <ErrorBoundary
          error={error}
          onRetry={onRetry}
          message="We could not load resources."
        >
          <Container maxWidth="lg" className={classes.container}>
            <Hidden lgUp>
              <PageHeader title="Catalog" />
            </Hidden>

            <Paper elevation={2}>
              <CatalogTableToolbar
                title="Products"
                searchTextUpdate={onChange}
                onDownloadCatalogPdf={onDownloadCatalogPdf}
              />
              <Divider />
              <CatalogTable
                products={filteredProducts}         
              />
            </Paper>
          </Container>
        </ErrorBoundary>
      </LoadingIndicator>
    </Layout>
  );
};

export default ProductList;
