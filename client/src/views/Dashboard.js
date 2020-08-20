import React from "react";
import Layout from "../components/layout/Layout";
import DownloadFile from "../components/DownloadFile";
import LatestProducts from "../components/LatestProducts";
import LatestOrders from "../components/LatestOrders";
import PageHeader from "../components/PageHeader";
import { makeStyles } from "@material-ui/styles";
import { Grid, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    // border: "1px solid purple",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      height: "100%",
    },
  },
  content: {
    // border: "1px solid red",
    flexGrow: 1,
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.container}>
        <PageHeader title="Dashboard" />

        <div className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <DownloadFile />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <DownloadFile />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <DownloadFile />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} xl={3}>
              <DownloadFile />
            </Grid>
            <Grid item xs={12} md={5} lg={5} xl={4}>
              <LatestProducts />
            </Grid>
            <Grid item xs={12} md={7} lg={7} xl={8}>
              <LatestOrders />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};

export default Dashboard;
