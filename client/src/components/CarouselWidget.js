import React from "react";
import Carousel from "react-material-ui-carousel";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageReptile from "../assets/contemplative-reptile.jpg";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStylesMediaCard = makeStyles({
  root: {
    // maxWidth: 345,
    height:300,    
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
  media: {
    height: 140,
  },
});

function MediaCard(props) {
  const classes = useStylesMediaCard();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ImageReptile}
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
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View More <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
}




const useStylesCarousel = makeStyles((theme) => ({
  root: {
    // maxWidth: "500px",
    boxShadow:
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    borderRadius: 4,
    '&$fullHeightHoverWrapper': {
      height: '100% !important'
    },
  },
 
}));

const CarouselWidget = () => {
  const classes = useStylesCarousel();
  const items = [
    {
      name: "Banner info 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, aliquam.",
      color: "#64ACC8",
    },
    {
      name: "Banner info 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, aliquam.",
      color: "#7D85B1",
    },
    {
      name: "Banner info 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, aliquam.",
      color: "#CE7E78",
    },
  ];

  return (
    <Carousel
      className={classes.root}
      animation="slide"
      interval={8000}
      // timeout={1200}
      indicators={false}
      fullHeightHover={false}
    >
      {items.map((item, i) => (
        <MediaCard key={i} item={item}
        
        />
        // <Banner key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default CarouselWidget;
