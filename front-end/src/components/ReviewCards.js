import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Rating,
  Grid,
} from "@mui/material";

export default function ReviewCards(props) {
  return (
    <Link
      to={{
        pathname: `/product_review/${props.category.toLowerCase()}/${
          props.reviewTitle
        }`,
      }}
      state={{
        image: props.image,
        reviewTitle: props.reviewTitle,
        reviewBody: props.reviewBody,
        seller: props.seller,
        rating: props.rating,
        category: props.category,
        condition: props.condition,
        location: props.location,
        salePrice: props.salePrice,
      }}
      style={{ textDecoration: "none" }}
    >
      <Box padding={2}>
        <Grid container alignItems="center" justifyContent={"center"}>
          <Card
            variant="outlined"
            sx={{
              width: 300,
              height: 350,
              margin: 1,
              borderRadius: "16px",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={props.image}
                alt={props.alt}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.reviewTitle}
                </Typography>
                <Typography variant="body2">{props.reviewBody}</Typography>
              </CardContent>
            </CardActionArea>
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <Rating
                name="read-only"
                value={props.rating}
                precision={0.5}
                readOnly
                align="center"
              />
              <CardActions>
                <Button size="small" color="info">
                  Read more
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
      </Box>
    </Link>
  );
}
