import React, { useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/SearchInput";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    // alignItems: "center",
    width: "auto",
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
  tableContainer: {
    height: "95%",
    marginTop: theme.spacing(2),
  },
  search: {
    height: "42px",
  },
  cell: {
    // paddingRight:'5px',
    // paddingLeft:theme.spacing(1),
  },
}));

const ProductList = (props) => {
  const [searchText, setSearchText] = useState("");
  const { products } = props.orders;
  const classes = useStyles();

  const onSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProducts = () => {
    if (searchText !== "") {
      const listFiltered = products.filter((product) => {
        const regex = new RegExp(`${searchText}`, "gi");
        return product.cod.match(regex) || product.descrip.match(regex);
      });
      return listFiltered;
    } else {
      return products;
    }
  };

  return (
    <Layout>
      <div className={classes.content}>
        <div className={classes.search}>
          <SearchInput placeholder="Search" onChange={onSearchText} />
        </div>

        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts().map((product) => (
                <TableRow hover key={product.cod}>
                  <TableCell>{product.cod}</TableCell>
                  <TableCell>{product.descrip}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <IconButton color="default" size="small">
                      <PhotoCameraOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps)(ProductList);
