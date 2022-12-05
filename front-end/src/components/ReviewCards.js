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
        pathname: `/product_listing/${props.id}`,
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
      <Box padding={2}>
        <Grid container alignItems="center" justifyContent={"center"}>
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              height: 250,
              borderRadius: "16px",
            }}
          >
          <Grid container alignItems={"center"} justifyContent={"center"}>
              <CardContent>
                <Typography variant="h6">{props.reviewTitle}</Typography>
                <Box sx={{ borderBottom: 3 }}></Box>
              </CardContent>
              </Grid>
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {props.reviewTitle}
                </Typography>
                <Box sx={{ borderBottom: 3 }}></Box>
              </CardContent>
              <CardActions>
                <Rating
                  name="read-only"
                  size="large"
                  value={props.rating}
                  precision={0.5}
                  readOnly
                  align="center"
                />
              </CardActions>
            </Grid>
            <CardActionArea>
              {/*<Grid container alignItems={"center"} justifyContent={"center"}>
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
              </Grid> */}
            </CardActionArea>
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <CardContent>
                <Typography variant="h7">{props.reviewBody}</Typography>
              </CardContent>
            </Grid>
            <Grid container alignItems={"center"} justifyContent={"center"}>
              <CardActions>
                <Button
                  size="small"
                  color="info"
                  sx={{
                    background: "#333",
                    color: "white",
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 25px",
                  }}
                >
                  View orginal listing
                </Button>
              </CardActions>
            </Grid>
          </Card>
        </Grid>
      </Box>
    </Link>
  );
}
