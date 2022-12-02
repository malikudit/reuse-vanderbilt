import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import BuyerEvaluation from "../../components/product_states/BuyerEvaluation";
import SellerEvaluation from "../../components/product_states/SellerEvaluation";
import OtherEvaluation from "../../components/product_states/OtherEvaluations";

export default function EvaluatingOffers(props) {
  // TODO Highest bidder logic
  var role = "";

  return (
    <Grid
      align={"center"}
      padding={4}
      marginLeft={2}
      marginRight={2}
      sx={{
        boxShadow: "0 0 5px #ccc",
        margin: "10vh",
        width: "90vw",
        height: "auto",
        paddingBottom: "7vh",
      }}
    >
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "75vh",
                maxWidth: "75vw",
              }}
              src={props.coverImage}
            />
          </Grid>
          <Grid item xs={7} direction="column" marginTop={2}>
            {role === "Highest-Bidder" ? (
              // EDIT
              <BuyerEvaluation sellerName={props.sellerName} />
            ) : role === "Seller" ? (
              <SellerEvaluation />
            ) : (
              <OtherEvaluation role={role} />
            )}
            <Grid item xs={2} marginTop={2} marginBottom={2}>
              <Typography
                variant="h5"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {props.itemName}
              </Typography>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: "40vw",
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography style={{ color: "#4169E1" }} variant="p">
                  {"Seller: "}
                  {props.sellerName}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: "40vw",
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography variant="p">
                  {"Exchange location: "}
                  {props.location}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: "40vw",
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography variant="p">{props.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
