import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPriceList } from "../store/actions/products";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import ProductsTable from "../components/ProductsTable";
import ImageModal from "../components/ImageModal";
import FetchError from "../components/hoc/FetchError";
import { errorMessageSelector, loadingSelector } from "../store/selector/index";
import CircularLoader from "../components/CircularLoader";
import {
  Divider,
  Box,
  Paper,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: "100%",
  },
  fixedPaperHeight: {
    height: "100%",
  },
  tableContainer: {
    overflowX: "auto",
    //100% - divider 1 - searchInput 48 = rest for table
    height: "calc(100% - 49px)",
  }, 
}));

const ProductList = (props) => {
  const classes = useStyles();
  const { getPriceList, products, error, isFetchingProducts } = props;
  const [searchField, setSearchField] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    getPriceList();
  }, [getPriceList]);

  const onChange = (e) => {
    setSearchField(e.target.value.trim());
  };

  const handleModalOpen = () => {
    setShowPhoto(true);
  };

  const handleModalClose = () => {
    setShowPhoto(false);
  }; 

  const filteredProducts = products.filter((product) => {
    return (
      product.cod.includes(searchField) ||
      product.descrip.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  return (
    <Layout>
      <ImageModal open={showPhoto} onClose={handleModalClose} />
      {isFetchingProducts ? (    
          <CircularLoader />     
      ) : error ? (
        <FetchError message={error} onRetry={getPriceList} />
      ) : (
        <Container maxWidth="md" className={classes.container}>
          <Paper className={classes.fixedPaperHeight}>
            <SearchInput onChange={onChange} placeholder="Search products" />
            <Divider />
            <Box className={classes.tableContainer}>
              <ProductsTable
                products={filteredProducts}
                handleModalOpen={handleModalOpen}
              />
            </Box>
          </Paper>
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
