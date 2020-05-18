import React, { useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import { makeStyles } from "@material-ui/core/styles";
import ProductsTable from "../components/ProductsTable";

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
}));

const ProductList = (props) => {
  const { products } = props.orders;
  const [filterStr, setFilterStr] = useState("");
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

  return (
    <Layout>
      <div className={classes.productList}>
        <div className={classes.searchInput}>
          <SearchInput onChange={onChange} placeholder='Search products'/>
        </div>
        <ProductsTable products={productsToShow()} />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps)(ProductList);
