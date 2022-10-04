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
  Rating,
  Grid,
} from "@mui/material";

export default function ReviewCards(props) {
  return (
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
  );
}
