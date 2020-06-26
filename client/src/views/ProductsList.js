import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import ProductsTable from "../components/ProductsTable";
import ImageModal from "../components/ImageModal";
import {
  CircularProgress,
  Divider,
  Box,
  Paper,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getPriceList } from "../store/actions/orders";
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
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

const ProductList = (props) => {
  const classes = useStyles();
  const {
    getPriceList,
    orders: { products },
  } = props;
  const [filterStr, setFilterStr] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    if (!products) {
      getPriceList();
    }
  }, [getPriceList, products]);

  const onChange = (e) => {
    setFilterStr(e.target.value.trim());
  };

  const handleModalOpen = () => {
    setShowPhoto(true);
  };

  const handleModalClose = () => {
    setShowPhoto(false);
  };

  const productsToShow = () => {
    if (filterStr !== "") {
      return products.filter((product) => {
        const regex = new RegExp(`${filterStr}`, "gi");
        return product.cod.match(regex) || product.descrip.match(regex);
      });
    } else {
      return products;
    }
  };

  return (
    <Layout>
      <ImageModal open={showPhoto} onClose={handleModalClose} />
      {products ? (
        <Container maxWidth="md" className={classes.container}>
          <Paper className={classes.fixedPaperHeight}>
            <SearchInput onChange={onChange} placeholder="Search products" />
            <Divider />
            <Box className={classes.tableContainer}>
              <ProductsTable
                products={productsToShow()}
                handleModalOpen={handleModalOpen}
              />
            </Box>
          </Paper>
        </Container>
      ) : (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, { getPriceList })(ProductList);
