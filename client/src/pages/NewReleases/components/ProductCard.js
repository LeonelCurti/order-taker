import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import styles from "./ProductCard-css";
const ProductCard = (props) => {
  const { classes, src, descrip, price, detailOpen } = props;

  return (
    <Card className={classes.root} elevation={4}>
      <CardMedia
        className={classes.media}
        image={src}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.desc}>
          {descrip}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className={classes.price}>
        <Typography variant="h6">
          <span>${price}</span>
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={detailOpen}
          className={classes.rightAction}
        >
          See Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ProductCard);
