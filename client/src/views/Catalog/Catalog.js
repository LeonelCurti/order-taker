import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPriceList } from "../../redux/actions/products";
import { removeErrors } from "../../redux/actions/error";
import { generateCatalogPdf } from "../../utils/generatePdf";
import { Container, Hidden, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout/Layout";
import CatalogTable from "./components/CatalogTable";
import ErrorBoundary from "../../components/ErrorBoundary";
import PageHeader from "../../components/PageHeader";
import LoadingIndicator from "../../components/LoadingIndicator";
import ImageModal from "../../components/ImageModal";
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

const ProductList = (props) => {
  const classes = useStyles();
  const {
    products,
    getPriceList,
    error,
    isFetchingProducts,
    removeErrors,
  } = props;
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [searchField, setSearchField] = useState("");

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
    getPriceList();
  }, [getPriceList]);

  //willUnmount
  useEffect(() => {
    return () => {
      removeErrors(["GET_PRICE_LIST"]);
    };
  }, [removeErrors]);

  const onShowProduct = (product) => {
    setShowPhotoModal(true);
  };

  const handleModalClose = () => {
    setShowPhotoModal(false);
  };
  const onDownloadCatalogPdf = () => {
    if (products) {
      generateCatalogPdf(products);
    }
  };

  const onRetry = () => getPriceList();

  return (
    <Layout>
      <LoadingIndicator isActive={isFetchingProducts}>
        <ErrorBoundary
          error={error}
          onRetry={onRetry}
          message="We could not load resources."
        >
          <ImageModal open={showPhotoModal} onClose={handleModalClose} />
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
                onShowProduct={onShowProduct}
              />
            </Paper>
          </Container>
        </ErrorBoundary>
      </LoadingIndicator>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  products: state.catalog.products,
  isFetchingProducts: state.loading["GET_PRICE_LIST"],
  error: state.error["GET_PRICE_LIST"],
});

export default connect(mapStateToProps, { getPriceList, removeErrors })(
  ProductList
);
