import React from "react";
import Layout from "../../components/layout/Layout";
import CarouselWidget from "../../components/CarouselWidget";
import DownloadFile from "./components/DownloadFile";
import NewProducts from "./components/NewProducts";
import LatestOrders from "./components/LatestOrders";
import { makeStyles } from "@material-ui/styles";
import { Grid, Hidden } from "@material-ui/core";
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

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <Hidden lgUp>
          <PageHeader title="Dashboard" />
        </Hidden>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CarouselWidget />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DownloadFile />
          </Grid>
          <Grid item xs={12} md={5} lg={5} xl={4}>
            <NewProducts />
          </Grid>
          <Grid item xs={12} md={7} lg={7} xl={8}>
            <LatestOrders />
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Dashboard;
