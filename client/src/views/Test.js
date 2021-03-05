import React from "react";
import Layout from "../components/layout/Layout";
// import { makeStyles } from "@material-ui/core/styles";
// import CarouselWidget from '../components/CarouselWidget'
import { Grid } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: { },
// }));

const Test = () => {
  // const classes = useStyles();  

  return (
    <Layout>
      <Grid container>
        <Grid item >
          <div style={{height:'100px', backgroundColor:'red'}}></div>
        </Grid>
        <Grid item xs>
          <div style={{height:'100px', backgroundColor:'green'}}></div>
        </Grid>
      </Grid>
    </Layout>
  );
  // return (
  //   <Layout>
  //     <div className={classes.root}>
  //       <CarouselWidget />
  //     </div>
  //   </Layout>
  // );
};

export default Test;