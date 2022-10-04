import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  createTheme,
  Grid,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DAA520",
    },
    secondary: {
      main: "#212121",
    },
    neutral: {
      main: "#ffffff",
    },
  },
});

export default function ProductCards(props) {
  return (
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
            <CardMedia
              component="img"
              height="200"
              image={props.image}
              alt={props.alt}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                align={"center"}
              >
                {props.itemName}
              </Typography>
              <Typography variant="body2" style={{ color: "#228B22" }}>
                {"Current bid: "}
                {props.currentBid}
              </Typography>
              <Typography variant="body2" style={{ color: "#228B22" }}>
                {"Buy now: "}
                {props.buyNow}
              </Typography>
              <Typography variant="body2" style={{ color: "#FF0000" }}>
                {"Time left: "}
                {props.timeLeft}
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
  );
}
