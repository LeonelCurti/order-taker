import React from "react";
import { makeStyles } from "@material-ui/styles";
import Layout from "../../components/layout/Layout";
import { Grid, Container, Hidden } from "@material-ui/core";
import ProductCard from "./components/ProductCard";
import PageHeader from "../../components/PageHeader";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
}));

const productsDemoList = [
  {
    descrip: "CODO PPN HH 2",
    src: "https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/024049.jpg",
    price: 4554,
  },
  {
    descrip: "LLAVE GAS 2 ALARSA",
    src: "https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/246019.jpg",
    price: 8989,
  },
  {
    descrip: "MANIJA CUADRADA BRONCE",
    src: "https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/332085.jpg",
    price: 657,
  },
  {
    descrip: "SIFON DOBLE GOMA RAO",
    src: "https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/354003.jpg",
    price: 897,
  },
  {
    descrip: "TERMOTANQUE POPULI G.E",
    src: "https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/390019.jpg",
    price: 44437,
  },
];

const NewReleases = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.root}>
        <Hidden lgUp>
          <PageHeader title="New Releases" />
        </Hidden>
        <Grid container direction="row" spacing={3}>
          {productsDemoList.map((item, i) => (
            <Grid item xs={12} sm={4} md={3} key={i}>
              <ProductCard
                name={item.name}
                descrip={item.descrip}
                src={item.src}
                price={item.price}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default NewReleases;
