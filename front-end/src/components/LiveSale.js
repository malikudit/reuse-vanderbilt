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
    <Grid align={"center"} padding={4} marginLeft={2} marginRight={2}
      sx={{
        boxShadow: "0 0 5px #ccc",
        margin: "10vh",
        width: "90vw",
        height: "auto",
        paddingBottom: "7vh"
      }}
    >
      <form noValidate autoComplete="off">
        <Grid container spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}>
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                width: "35vw",
                height: "100%",
                overflow: "hidden",
                display: "block"
              }}
              src={props.coverImage}
            />
          </Grid>
          <Grid item xs={7} direction="column" marginTop={2}
            sx={{
              maxWidth: "50vw",
              maxHeight: "50vh",
            }}>
            <Grid item xs={2} marginBottom={2} sx={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "15px",
              justifyItems: "center",
              maxWidth: "80%"
            }}>
              <Typography variant="h4" sx={{
                textTransform: "uppercase",
                letterSpacing: "2px"
              }}>
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
            <Grid container justifyContent="space-between">
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
            <Grid container marginBottom={2}>
              <Grid item xs={12} marginBottom={5} marginTop={2}
                sx = {{
                  maxWidth: "40vw",
                  justifyContent: "left",
                  justifyItems: "left",
                  alignText: "left"
                }}
              >
                <Typography variant="p" sx = {{ lineHeight: "1.5" }}>
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
                    marginBottom={2}
                  >
                    <Grid item xs={6} marginBottom={2}>
                      <Typography
                        style={{ color: "#4169E1", fontWeight: "bold" }}
                      >
                        {"Current Bid Placed: "}
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
                            {"Current Bid Placed: "}
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
                            sx={{
                              background: "#333",
                              color: "white",
                              outline: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "10px 25px",
                            }}
                          >
                            Place Bid
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            sx={{
                              background: "#333",
                              color: "white",
                              outline: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "10px 25px",
                            }}
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
                              sx={{ 
                                background: "#333",
                                color: "white",
                                outline: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "10px 25px",
                              }}
                            >
                              Place Bid
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={handleBuyNow()}
                              sx={{
                                background: "#333",
                                color: "white",
                                outline: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "10px 25px",
                              }}
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
                        sx={{
                          background: "#333",
                          color: "white",
                          outline: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "10px 25px",
                        }}
                      >
                        Buy Now!
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          background: "error",
                          color: "white",
                          outline: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "10px 25px",
                        }}
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
