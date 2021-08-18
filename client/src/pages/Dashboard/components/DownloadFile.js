import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import axios from "axios";
import { downloadCatalogExcel } from "../../../utils/downloadCatalogExcel";
import {generateCatalogPdf} from '../../../utils/generatePdf'
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  SvgIcon,
} from "@material-ui/core";
import DownloadItem from "./DownloadItem";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

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

  const downloadCatalogPdf = async () => {
    const res = await axios.get("/api/v1/pricelist");
    if(res.data.products&& res.data.products.length){
      generateCatalogPdf(res.data.products)
    }
  };
  return (
    <Card className={clsx(classes.root, className)} elevation={4}>
      <CardHeader title="Download files" className={classes.cardHeader} />
      <Divider />
      <div style={{ height: "80%" }}>
        <CardContent className={classes.content}>
          <DownloadItem
            fileName="Catalog.xlsx"
            updatedAt="Updated 12/8/20"
            onClick={downloadCatalogExcel}
          >
            <SvgIcon color="primary" fontSize="large">
              <path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12.06L9.93 8.89H8.22L7.13 10.9L7.09 10.96L7.06 11.03Q6.8 10.5 6.5 9.96 6.25 9.43 5.97 8.89H4.16L6.05 12.08L4 15.28H5.78M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H12V15.75M13.88 11.38V8.25H12V11.38M13.88 7V4.5H8.25V7M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38M20.75 7V4.5H15.13V7Z" />
            </SvgIcon>
          </DownloadItem>
          <DownloadItem fileName="Catalog.pdf" updatedAt="Updated 12/8/20" onClick={downloadCatalogPdf}>
            <PictureAsPdfIcon color="primary" fontSize="large" />
          </DownloadItem>
          <DownloadItem fileName="NewProducts.xlsx" updatedAt="Updated 12/8/20" onClick={downloadCatalogExcel}>
            <SvgIcon color="primary" fontSize="large">
              <path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12.06L9.93 8.89H8.22L7.13 10.9L7.09 10.96L7.06 11.03Q6.8 10.5 6.5 9.96 6.25 9.43 5.97 8.89H4.16L6.05 12.08L4 15.28H5.78M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H12V15.75M13.88 11.38V8.25H12V11.38M13.88 7V4.5H8.25V7M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38M20.75 7V4.5H15.13V7Z" />
            </SvgIcon>
          </DownloadItem>
        </CardContent>
      </div>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
