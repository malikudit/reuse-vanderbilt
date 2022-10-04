import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";

export default function Listings() {
  return (
    <div>
      <Grid align={"center"} padding={2}>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/create_listing"
        >
          Create Listing
        </Button>
      </Grid>
    </div>
  );
}
