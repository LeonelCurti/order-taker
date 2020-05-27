import React, { useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import { makeStyles } from "@material-ui/core/styles";
import ProductsTable from "../components/ProductsTable";
import Typography from "@material-ui/core/Typography";
import ImageModal from "../components/ImageModal";
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
    padding:theme.spacing(1),
    height: "42px",
    marginBottom: theme.spacing(2),
  },
}));

const NewOrder = (props) => {
  const { products } = props.orders;
  const [filterStr, setFilterStr] = useState("");
  const [showPhoto, setShowPhoto] = useState(false);
  const classes = useStyles();

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

  const handleAddProduct = ()=>{
    console.log('add product');
    
  }
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
          <ProductsTable products={productsToShow()}  />
        </div>
        <div className={classes.container}>
          <div className={classes.searchInput}>
            <SearchInput onChange={onChange} placeholder="Search products" />
          </div>
          <ProductsTable products={productsToShow()} handleAddProduct={handleAddProduct}
          handleModalOpen={handleModalOpen}
          />
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps)(NewOrder);
