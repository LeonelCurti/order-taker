import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import moment from "moment";
import Product1 from "../../../assets/product_1.png";
import Product2 from "../../../assets/product_2.png";
import Product3 from "../../../assets/product_3.png";
import Product4 from "../../../assets/product_4.png";

const mockData = [
  {
    cod: "038162",
    descrip: "BOTON DELTA CHICO CAPEA",
    name: "Dropbox",
    price: 179.1,
    imageUrl: Product1,
    updatedAt: moment().subtract(2, "hours"),
  },
  {
    cod: "038163",
    descrip: "BOTON FERRUM REDONDO BLANCO",
    price: 306.06,
    name: "Medium Corporation",
    imageUrl: Product2,
    updatedAt: moment().subtract(2, "hours"),
  },
  {
    cod: "038164",
    descrip: "BOTON LATERAL CAPEA CROMO",
    price: 110.51,
    name: "Slack",
    imageUrl: Product3,
    updatedAt: moment().subtract(3, "hours"),
  },
  {
    cod: "038164",
    descrip: "ABRAZADERA A CREMALLERA Nº3",
    price: 110.51,
    name: "Slack",
    imageUrl: Product4,
    updatedAt: moment().subtract(5, "hours"),
  },
];

const useStyles = makeStyles(() => ({
  root: {
    // height: "100%",
  },
  content: {
    padding: 0,
    "& .MuiListItem-dense": {
      paddingTop: "3px",
      paddingBottom: "3px",
    },
  },
  image: {
    height: 30,
    width: 30,
  },
  actions: {
    justifyContent: "flex-end",
  },
  cardHeader: {
    "& .MuiCardHeader-title": {
      fontSize: "1.2rem",
    },
  },
}));

const NewProducts = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <Card {...rest} className={clsx(classes.root, className)} elevation={4}>
      <CardHeader title="New products" className={classes.cardHeader} />
      <Divider />
      <CardContent className={classes.content}>
        <List disablePadding dense>
          {products.map((product, i) => (
            <ListItem
              // divider={i < products.length - 1}
              key={i}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText primary={product.descrip} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

NewProducts.propTypes = {
  className: PropTypes.string,
};

export default NewProducts;
