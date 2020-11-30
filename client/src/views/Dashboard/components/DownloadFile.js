import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, Divider, CardContent } from "@material-ui/core";
import DownloadItem from "./DownloadItem";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    // padding: theme.spacing(2),
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHeader: {
    "& .MuiCardHeader-title": {
      fontSize: "1.2rem",
    },
  },
}));

const Budget = (props) => {
  const { className } = props;

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} elevation={4}>
      <CardHeader title="Download files" className={classes.cardHeader} />
      <Divider />
      <div style={{ height: "80%" }}>
        <CardContent className={classes.content}>
          <DownloadItem fileName="PriceList.xlsx" updatedAt="Updated 12/8/20" />
          <DownloadItem fileName="Catalog.pdf" updatedAt="Updated 12/8/20" />
          <DownloadItem
            fileName="NewProducts.xlsx"
            updatedAt="Updated 12/8/20"
          />
        </CardContent>
      </div>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
