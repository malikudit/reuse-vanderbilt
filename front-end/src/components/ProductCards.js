import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
} from "@mui/material";
import CountdownTimer from "./CountdownTimer";

const ProductCards = ({
  image = "",
  itemName = "",
  description = "",
  seller = "",
  condition = "",
  location = "",
  currentBid = "$",
  buyNow = "$",
  expirationDate = "",
  category = "",
}) => (
  <Link
    to={{
      pathname: `/product_listing/${category.toLowerCase()}/${itemName}`,
    }}
    state={{
      image: image,
      itemName: itemName,
      description: description,
      seller: seller,
      condition: condition,
      location: location,
      currentBid: currentBid,
      buyNow: buyNow,
      expirationDate: expirationDate,
      category: category,
    }}
    style={{ textDecoration: "none" }}
  >
    <Box padding={2}>
      <Grid container>
        <Card
          variant="outlined"
          sx={{
            width: 300,
            height: 375,
            margin: 1,
            borderRadius: "16px",
            border: "0.5px solid black",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              width="100%"
              image={image}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align={"center"}
              >
                {itemName}
              </Typography>
              <Typography variant="body2" style={{ color: "#228B22" }}>
                {"Current bid: "}
                {currentBid}
              </Typography>
              <Typography variant="body2" style={{ color: "#228B22" }}>
                {"Buy now price: "}
                {buyNow}
              </Typography>
              <Typography variant="body2" style={{ color: "#FF0000" }}>
                <CountdownTimer countDownDate={expirationDate} />
              </Typography>
              <Typography variant="body2" style={{ color: "#4169E1" }}>
                {"Category: "}
                {category}
              </Typography>
              <Typography variant="body2" style={{ color: "#000000" }}>
                {"Condition: "}
                {condition}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"center"}
          ></Grid>
        </Card>
      </Grid>
    </Box>
  </Link>
);

export default ProductCards;
