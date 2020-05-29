import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import { makeStyles } from "@material-ui/core/styles";
import ProductsTable from "../components/ProductsTable";
import OrderTable from "../components/OrderTable";
import Typography from "@material-ui/core/Typography";
import ImageModal from "../components/ImageModal";
import { getPriceList } from "../store/actions/orders";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  myOrders: {
    display: "flex",
    padding: theme.spacing(2),
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: "0 5px",
  },
  searchInput: {
    height: "42px",
    marginBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(1),
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

const NewOrder = (props) => {
  const {
    getPriceList,
    orders: { products },
  } = props;
  const [filterStr, setFilterStr] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!products) {
      getPriceList();
    }
  }, [getPriceList, products]);

  const onChange = (e) => {
    setFilterStr(e.target.value.trim());
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

  const handleAddProduct = () => {
    console.log("add product");
  };
  const handleRemoveProduct = () => {
    console.log("add product");
  };

  const handleModalOpen = () => {
    setShowPhoto(true);
  };

  const handleModalClose = () => {
    setShowPhoto(false);
  };

  return (
    <Layout>
      <ImageModal open={showPhoto} onClose={handleModalClose} />
      <div className={classes.myOrders}>
        <div className={classes.container}>
          <div className={classes.title}>
            <Typography variant="h5" gutterBottom>
              New Order
            </Typography>
          </div>
          <OrderTable handleRemoveProduct={handleRemoveProduct} />
        </div>
        <div className={classes.container}>
          {products ? (
            <Fragment>
              <div className={classes.searchInput}>
                <SearchInput
                  onChange={onChange}
                  placeholder="Search products"
                />
              </div>
              <ProductsTable
                products={productsToShow()}
                handleAddProduct={handleAddProduct}
                handleModalOpen={handleModalOpen}
              />
            </Fragment>
          ) : (
            <div className={classes.centerMe}>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, { getPriceList })(NewOrder);
