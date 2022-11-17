import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import CountdownTimer from "./CountdownTimer";

export default function LiveSale(props) {
  const handleBid = (e) => {
    // e.preventDefault();
  };

  const handleBuyNow = (e) => {
    // e.preventDefault();
  };

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
            <Grid item xs={2} marginBottom={2} borderBottom={1}>
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
                  {props.color}
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
              <Grid item xs={12} marginBottom={5} marginTop={2}>
                <Typography variant="h6">
                  {"Product Description: "}
                  {props.description}
                </Typography>
              </Grid>
              <Grid item xs={12} marginBottom={2}>
                <Typography style={{ color: "#FF0000", fontWeight: "bold" }}>
                  <CountdownTimer
                    countDownDate={props.timeLeft}
                    productPage={true}
                  />
                </Typography>
              </Grid>
            </Grid>
            {new Date(props.timeLeft).getTime() - new Date().getTime() > 0 ? (
              <div>
                {props.currentBid !== null && props.buyNow !== null ? (
                  <Grid
                    container
                    justifyContent="space-between"
                    borderBottom={1}
                    marginBottom={2}
                  >
                    <Grid item xs={6} marginBottom={2}>
                      <Typography
                        style={{ color: "#4169E1", fontWeight: "bold" }}
                      >
                        {"Current Bid Price: "}
                        {props.currentBid}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} marginBottom={2}>
                      <Typography
                        style={{ color: "#228B22", fontWeight: "bold" }}
                      >
                        {"Buy Now Price: "}
                        {props.buyNow}
                      </Typography>
                    </Grid>
                    {props.listingType === "Bid-Only" || "Bid-And-Buy-Now" ? (
                      <Grid item xs={6} marginBottom={2}>
                        <Typography
                          style={{ color: "#4169E1", fontWeight: "bold" }}
                        >
                          {"Next Minimum Bid Allowed: "}
                          {props.nextBid}
                        </Typography>
                      </Grid>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                ) : (
                  <div>
                    {props.currentBid !== null ? (
                      <div>
                        <Grid item xs={6} marginBottom={2}>
                          <Typography
                            style={{ color: "#4169E1", fontWeight: "bold" }}
                          >
                            {"Current Bid Price: "}
                            {props.currentBid}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} marginBottom={2}>
                          <Typography
                            style={{ color: "#4169E1", fontWeight: "bold" }}
                          >
                            {"Next Minimum Bid Allowed: "}
                            {props.nextBid}
                          </Typography>
                        </Grid>
                      </div>
                    ) : (
                      <div>
                        <Grid item xs={6} marginBottom={2}>
                          <Typography
                            style={{ color: "#228B22", fontWeight: "bold" }}
                          >
                            {"Buy Now Price: "}
                            {props.listingPrice}
                          </Typography>
                        </Grid>
                      </div>
                    )}
                  </div>
                )}
                <Grid
                  container
                  justifyContent="space-between"
                  borderBottom={1}
                  marginBottom={2}
                >
                  {props.sellerID !== "Parwaz" ? (
                    <Grid
                      container
                      justifyContent={"space-evenly"}
                      marginBottom={2}
                    >
                      {props.listingType === "Bid-And-Buy-Now" ? (
                        <Grid container justifyContent={"space-evenly"}>
                          <Button
                            variant="contained"
                            color="info"
                            sx={{ fontWeight: "bold" }}
                          >
                            Place Bid
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            sx={{ fontWeight: "bold" }}
                          >
                            Buy Now
                          </Button>
                        </Grid>
                      ) : (
                        <Grid
                          container
                          flex
                          justifyContent={"center"}
                          marginBottom={2}
                        >
                          {props.listingType === "Bid-Only" ? (
                            <Button
                              variant="contained"
                              color="info"
                              onClick={handleBid()}
                              sx={{ fontWeight: "bold" }}
                            >
                              Place Bid
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={handleBuyNow()}
                              sx={{ fontWeight: "bold" }}
                            >
                              Buy Now
                            </Button>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  ) : (
                    <Grid
                      container
                      justifyContent={"space-evenly"}
                      marginBottom={2}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ fontWeight: "bold" }}
                      >
                        Delete Listing
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </div>
            ) : (
              <div></div>
            )}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
