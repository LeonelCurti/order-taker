import React from "react";
import Carousel from "react-material-ui-carousel";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image1 from "../assets/pexels-1.jpg";
import Image2 from "../assets/pexels-2.jpg";
import Image3 from "../assets/pexels-3.jpg";
import Hidden from "@material-ui/core/Hidden";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStylesMediaCard = makeStyles({
  root: {
    // maxWidth: 345,
    height: 300,
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
  media: {
    height: 160,
  },
});

function MediaCard(props) {
  const classes = useStylesMediaCard();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.item.src}
        title="Banner Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.item.description}
        </Typography>
      </CardContent>
      <Hidden smDown>
        <CardActions>
          <Button size="small" color="primary">
            View More <ArrowRightIcon />
          </Button>
        </CardActions>
      </Hidden>
    </Card>
  );
}

const useStylesCarousel = makeStyles((theme) => ({
  root: {
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    borderRadius: 4,
  },
}));

const CarouselWidget = () => {
  const classes = useStylesCarousel();
  const items = [
    {
      name: "Month's Offer",
      description: "Buy one, get another for free",
      color: "#64ACC8",
      src: Image1,
    },
    {
      name: "Flash Sale",
      description: "48 hour flash sale in hand tools",
      color: "#7D85B1",
      src: Image2,
    },
    {
      name: "Best Prices",
      description: "Pre-launch and exclusive offers. Don't miss out!",
      color: "#CE7E78",
      src: Image3,
    },
  ];

  return (
    <Carousel
      className={classes.root}
      animation="slide"
      interval={8000}
      // timeout={1200}
      navButtonsProps={{
        style: {
          // backgroundColor: "#514cbc",
          // color: "#514cbc",
        },
      }}
      navButtonsWrapperProps={{
        style: {
          // backgroundColor: "trasparent",
          top: "calc(50% - 65px)",
        },
      }}
      indicators={false}
      fullHeightHover={false}
    >
      {items.map((item, i) => (
        <MediaCard key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default CarouselWidget;
