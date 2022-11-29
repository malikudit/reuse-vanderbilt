import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@mui/material";

export default function BuyerEvaluation(props) {
  // TODO Highest bidder logic
  // Missing buyer logic
  var message = "Congrats! You have received an offer(s)!";

  return (
    <Grid container>
      <Grid item xs={12} marginBottom={2} marginTop={2}>
        <Typography
          variant="h6"
          style={{ color: "#228B22", fontWeight: "bold" }}
        >
          {message}
        </Typography>
        <Typography
          variant="h6"
          style={{ color: "#228B22", fontWeight: "bold" }}
        >
          Contact the buyer at the following information to coordinate the
          transaction:
        </Typography>
      </Grid>
      <Grid item xs={12} marginBottom={2} marginTop={2} borderBottom={2}>
        <Typography component={Link} to="/profile" variant="h6">
          Buyer Name:
          {" " + props.sellerName}
        </Typography>
        <Typography variant="h6">
          Buyer Contact Information:
          {" Insert Phone/GroupMe"}
        </Typography>
        <Typography variant="h9" sx={{ color: "#FF0000" }}>
          Note: You can still reject the offer if the buyer is unable to
          coordinate the exchange in a timely manner or if they do not meet your
          terms of sale. However, if you reject the offer, there is no guarantee
          that you will have other offers to fall back on.
        </Typography>
        <Grid
          container
          justifyContent={"space-evenly"}
          marginTop={2}
          marginBottom={2}
        >
          <Button variant="contained" color="error">
            Decline Offer
          </Button>
          <Button variant="contained" color="success">
            Accept Offer
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
