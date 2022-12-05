import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@mui/material";

export default function BuyerEvaluation(props) {
  // TODO Highest bidder logic
  var message = "Congrats! You are the highest bidder!";

  return (
    <div>
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
          Contact the seller at the following information to coordinate the
          transaction:
        </Typography>
      </Grid>
      <Grid item xs={12} marginBottom={2} marginTop={2} borderBottom={2}>
        <Typography component={Link} to="/profile" variant="h6">
          Seller Name:
          {" " + props.sellerName}
        </Typography>
        <Typography variant="h6">
          Seller Contact Information:
          {" Insert Phone/GroupMe"}
        </Typography>
        <Typography variant="h6">
          Seller Preferred form of Payment:
          {" Insert Phone/GroupMe"}
        </Typography>
        <Typography variant="h9" sx={{ color: "#FF0000" }}>
          Note: The seller can still reject your bid if you are unable to
          coordinate the exchange in a timely manner.
        </Typography>
      </Grid>
    </div>
  );
}
