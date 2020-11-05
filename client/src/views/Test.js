import React from "react";
import Layout from "../components/layout/Layout";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { },
}));

const Test = () => {
  const classes = useStyles();  

  return (
    <Layout>
      <div className={classes.root}>
      hello
      </div>
    </Layout>
  );
};

export default Test;