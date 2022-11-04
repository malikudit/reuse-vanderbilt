import { React } from "react";
import {
  Box,
  Grid,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import DefaultBanner from "../components/DefaultBanner";
import CountdownTimer from "../components/CountdownTimer";

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
    info: {
      main: "#4169E1",
    },
    success: {
      main: "#228B22",
    },
    background: {
      default: "#696969",
    },
  },
});

export default function ProductPage() {
  const locImage = useLocation().state.image;
  const locItemName = useLocation().state.itemName;
  const locDescription = useLocation().state.description;
  const locSellerName = useLocation().state.seller;
  const locCondition = useLocation().state.condition;
  const locLocation = useLocation().state.location;
  const locListingType = useLocation().state.listingType;
  const locCurrentBid = useLocation().state.currentBid;
  const locBidIncrement = useLocation().state.bidIncrement;
  const locBuyNow = useLocation().state.buyNow;
  const locTimeLeft = useLocation().state.expirationDate;
  const locCategory = useLocation().state.category;
  const locSellerID = useLocation().state.sellerID;
  const nextBid = locCurrentBid + " + " + locBidIncrement;

  const handleBid = (e) => {
    // e.preventDefault();
  };

  const handleBuyNow = (e) => {
    // e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <DefaultBanner banner={"Product Listing Page"} />
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
                src={locImage}
              />
            </Grid>
            <Grid item xs={7} direction="column" marginTop={2}>
              <Grid item xs={2} marginBottom={2} borderBottom={1}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {"Product Name: "}
                  {locItemName}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#4169E1" }}>
                    {"Seller: "}
                    {locSellerName}
                  </Typography>
                </Grid>
                <Grid item xs={5.9} marginBottom={2}>
                  <Typography style={{ color: "#4169E1" }}>
                    {"Category: "}
                    {locCategory}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between" borderBottom={1}>
                <Grid item xs={6} marginBottom={2}>
                  <Typography>
                    {"Condition: "}
                    {locCondition}
                  </Typography>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Typography>
                    {"Location of Exchange: "}
                    {locLocation}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container marginBottom={2} borderBottom={1}>
                <Grid item xs={12} marginBottom={5} marginTop={2}>
                  <Typography variant="h6">
                    {"Product Description: "}
                    {locDescription}
                  </Typography>
                </Grid>
                <Grid item xs={12} marginBottom={2}>
                  <Typography style={{ color: "#FF0000", fontWeight: "bold" }}>
                    <CountdownTimer
                      countDownDate={locTimeLeft}
                      productPage={true}
                    />
                  </Typography>
                </Grid>
              </Grid>
              {new Date(locTimeLeft).getTime() - new Date().getTime() > 0 ? (
                <div>
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
                        {locCurrentBid}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} marginBottom={2}>
                      <Typography
                        style={{ color: "#228B22", fontWeight: "bold" }}
                      >
                        {"Buy Now Price: "}
                        {locBuyNow}
                      </Typography>
                    </Grid>
                    {locListingType === "Bid-Only" || "Bid-And-Buy-Now" ? (
                      <Grid item xs={6} marginBottom={2}>
                        <Typography
                          style={{ color: "#4169E1", fontWeight: "bold" }}
                        >
                          {"Next Minimum Bid Allowed: "}
                          {nextBid}
                        </Typography>
                      </Grid>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    borderBottom={1}
                    marginBottom={2}
                  >
                    {locSellerID !== "Parwaz" ? (
                      <Grid
                        container
                        justifyContent={"space-evenly"}
                        marginBottom={2}
                      >
                        {locListingType === "Bid-And-Buy-Now" ? (
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
                            {locListingType === "Bid-Only" ? (
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
    </ThemeProvider>
  );
}
