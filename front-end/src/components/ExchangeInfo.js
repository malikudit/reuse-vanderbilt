import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";

export default function ExchangeInfo(props) {
  return (
    <Grid align={"center"} padding={4} marginLeft={2} marginRight={2}>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
              }}
              src={props.image}
            />
          </Grid>
          <Grid item xs={7} direction="column" marginTop={2}>
            <Grid item xs={12} marginBottom={2} marginTop={2} borderBottom={1}>
              <Typography
                variant="h5"
                style={{ color: "#228B22", fontWeight: "bold" }}
              >
                CONGRATS ON YOUR SALE!
              </Typography>
              <Typography
                variant="h6"
                style={{ color: "#228B22", fontWeight: "bold" }}
              >
                Contact the individual you are exchanging with at the following
                information:
              </Typography>
            </Grid>
            <Grid item xs={12} marginBottom={2} marginTop={2} borderBottom={1}>
              <Typography variant="h6">
                Contact Info of Person You're Exchanging With:
                {" " + props.sellerName}
              </Typography>
              <Typography variant="h6">{"Insert Phone/GroupMe"}</Typography>
            </Grid>
            <Grid container justifyContent={"center"} borderBottom={1}>
              <Typography
                variant="h8"
                style={{ color: "#4169E1", fontWeight: "bold" }}
              >
                When you've completed the transaction, be sure to leave a review
                of your exchange experience!
              </Typography>
              <Grid marginBottom={2}>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  sx={{ fontWeight: "bold" }}
                >
                  <Link
                    to="new_review"
                    state={{
                      itemName: props.itemName,
                      image: props.image,
                      sellerID: props.sellerID,
                      sellerName: props.sellerName,
                      category: props.category,
                      condition: props.condition,
                      location: props.location,
                      salePrice: props.salePrice,
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    Leave a Review
                  </Link>
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={2} marginTop={2} marginBottom={2} borderBottom={1}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {"Product Name: "}
                {props.itemName}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={6} marginBottom={2}>
                <Typography style={{ color: "#4169E1" }}>
                  {"Seller: "}
                  {props.sellerName}
                </Typography>
              </Grid>
              <Grid item xs={5.9} marginBottom={2}>
                <Typography style={{ color: "#4169E1" }}>
                  {"Category: "}
                  {props.category}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" borderBottom={1}>
              <Grid item xs={6} marginBottom={2}>
                <Typography>
                  {"Condition: "}
                  {props.condition}
                </Typography>
              </Grid>
              <Grid item xs={6} marginBottom={2}>
                <Typography>
                  {"Location of Exchange: "}
                  {props.location}
                </Typography>
              </Grid>
            </Grid>
            <Grid container marginBottom={2} borderBottom={1}>
              <Grid item xs={12} marginBottom={2} marginTop={2}>
                <Typography variant="h6">
                  {"Product Description: "}
                  {props.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
