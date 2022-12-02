import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

export default function OtherEvaluation(props) {
  var role = props.role;
  var message = "";

  if (role === "Other-Bidder") {
    message =
      "You do not have the highest bid but your offer may still be picked! Continue to monitor the product page for updates.";
  }

  if (role === "Unsuccessful-Bidder") {
    message = "Unfortunately, your bid was rejected.";
  }

  if (role === "Other") {
    message = "This product is not accepting offers.";
  }
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
        <Typography variant="h9" sx={{ color: "#FF0000" }}>
          Note: The seller can still reject your bid if you are unable to
          coordinate the exchange in a timely manner.
        </Typography>
      </Grid>
    </div>
  );
}
