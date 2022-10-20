import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
} from "@mui/material";

const ProductCards = ({
  image = "",
  alt = "",
  itemName = "",
  currentBid = "$",
  buyNow = "$",
  timeLeft = "",
  category = "",
}) => (
  <Box padding={2}>
    <Grid container>
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
          <CardMedia component="img" height="200" image={image} alt={alt} />
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
              {"Buy now: "}
              {buyNow}
            </Typography>
            <Typography variant="body2" style={{ color: "#FF0000" }}>
              {"Time left: "}
              {timeLeft}
            </Typography>
            <Typography variant="body2" style={{ color: "#4169E1" }}>
              {"Category: "}
              {category}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Grid container alignItems={"center"} justifyContent={"center"}></Grid>
      </Card>
    </Grid>
  </Box>
);

export default ProductCards;
