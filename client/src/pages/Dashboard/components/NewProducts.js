import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"
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

const mockData = [
  {
    cod: "270021",
    descrip: "MEDIA UNION REDUC",
    price: 179.1,
    imageUrl:`https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/270021.jpg`,
    updatedAt: moment().subtract(2, "hours"),
  },
  {
    cod: "192044",
    descrip: "VALVULA EVOLUTION 3/4",
    price: 306.06,
    imageUrl: `https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/192044.jpg`,
    updatedAt: moment().subtract(2, "hours"),
  },
  {
    cod: "274011",
    descrip: "MONTURA 1 x 1 EPOXI",
    price: 110.51,  
    imageUrl: `https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/274011.jpg`,
    updatedAt: moment().subtract(3, "hours"),
  },
  {
    cod: "246019",
    descrip: "LLAVE GAS 2 ALARSA",
    price: 110.51,   
    imageUrl: `https://res.cloudinary.com/dte10bevv/image/upload/v1629671758/orderTaker/246019.jpg`,
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

  const handleViewNewReleases = () => {
    props.history.push("/newReleases");
  };

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
        <Button color="primary" size="small" variant="text" onClick={handleViewNewReleases}>
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

NewProducts.propTypes = {
  className: PropTypes.string,
};

export default withRouter(NewProducts);
