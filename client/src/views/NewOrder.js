import React, { useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import { makeStyles } from "@material-ui/core/styles";
import ProductsTable from "../components/ProductsTable";

const useStyles = makeStyles((theme) => ({
  myOrders: {
    display: "flex",
    padding: theme.spacing(2),
    height: "100%",
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: "0 5px",
  },
  orderTable: {
    flexGrow: 1,
    margin: "0 5px",
    // marginTop: theme.spacing(3),
  },
  searchInput: {
    height: "42px",
    marginBottom: theme.spacing(2),
  },
}));

const NewOrder = (props) => {
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
      <div className={classes.myOrders}>
        <div className={classes.orderTable}>
          <ProductsTable products={productsToShow()} />
        </div>
        <div className={classes.productList}>
          <div className={classes.searchInput}>
            <SearchInput
              placeholder="Search code or description"
              onChange={onChange}
            />
          </div>
          <ProductsTable products={productsToShow()} />
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps)(NewOrder);
