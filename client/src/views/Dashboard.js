import React from "react";
// import FetchError from "../components/hoc/FetchError";
import Layout from "../components/layout/Layout";
import Budget from "../components/Budget";
import LatestProducts from "../components/LatestProducts";
import LatestOrders from "../components/LatestOrders";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    padding: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={3} xl={3}>
            <Budget />
          </Grid>
          <Grid item xs={12} sm={6} lg={3} xl={3}>
            <Budget />
          </Grid>
          <Grid item xs={12} sm={6} lg={3} xl={3}>
            <Budget />
          </Grid>
          <Grid item xs={12} sm={6} lg={3} xl={3}>
            <Budget />
          </Grid>
          <Grid item xs={12} lg={5} md={5} xl={4}>
            <LatestProducts />
          </Grid>
          <Grid item xs={12} lg={7} md={7} xl={8}>
            <LatestOrders />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Dashboard;
