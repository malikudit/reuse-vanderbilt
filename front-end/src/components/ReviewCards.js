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
        pathname: `/product_review/${props.category.toLowerCase()}/${props.reviewTitle
          }`,
      }}
      state={{
        coverImage: props.coverImage,
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
      <Box padding={2} marginLeft = {3}>
        <Grid container alignItems="center" justifyContent={"center"}>
          <Card
            variant="outlined"
            sx={{
              width: 300,
              height: 350,
              borderRadius: "16px",
            }}
          >
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <CardActions>
                <Rating
                  name="read-only"
                  size="large"
                  value={props.rating}
                  precision={0.5}
                  readOnly
                  align="center"
                  sx = {{
                    marginTop: "2vh"
                  }}
                />
              </CardActions>
            </Grid>
            <CardActionArea>
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <CardMedia
                component="img"
                height="140"
                coverImage={props.coverImage}
                alt={props.alt}
                sx = {{
                  borderRadius: "50% 50% 50% 50%",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  height: 120,
                  width: 120,  
                  border: "6px solid white",
                  filter: "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.1))",
                }}
              />
              </Grid>
              <Grid container alignItems={"center"} justifyContent={"center"}>
              <CardContent>
                <Typography variant="h6">{props.reviewTitle}</Typography>
              </CardContent>
              </Grid>
            </CardActionArea>
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <CardActions>
                <Button size="small" color="info"
                  sx = {{
                    background: "#333",
                    color: "white",
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 25px",
                  }}>
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
