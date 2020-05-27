import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import { CircularProgress } from "@material-ui/core";
import SearchInput from "../components/SearchInput";
import { makeStyles } from "@material-ui/core/styles";
import ProductsTable from "../components/ProductsTable";
import { getPriceList } from "../store/actions/orders";
import ImageModal from "../components/ImageModal";
const useStyles = makeStyles((theme) => ({
  productList: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: "0 auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      width: "82.5%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "70%",
    },
    height: "100%",
  },
  searchInput: {
    height: "42px",
    marginBottom: theme.spacing(2),
  },
  centerMe: {
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
        <div className={classes.productList}>
          <div className={classes.searchInput}>
            <SearchInput onChange={onChange} placeholder="Search products" />
          </div>
          <ProductsTable
            products={productsToShow()}
            handleModalOpen={handleModalOpen}
          />
        </div>
      ) : (
        <div className={classes.centerMe}>
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
