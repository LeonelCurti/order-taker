import React from "react";
import Layout from "../components/layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import CarouselWidget from '../components/CarouselWidget'
const useStyles = makeStyles((theme) => ({
  root: { },
}));

const Test = () => {
  const classes = useStyles();  

  return (
    <Layout>
      <div className={classes.root}>
        <CarouselWidget />
      </div>
    </Layout>
  );
};

export default Test;