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
import NavBar from "../components/NavBar";

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
  const locSeller = useLocation().state.seller;
  const locCondition = useLocation().state.condition;
  const locLocation = useLocation().state.location;
  const locCurrentBid = useLocation().state.currentBid;
  const locBuyNow = useLocation().state.buyNow;
  const locTimeLeft = useLocation().state.expirationDate;
  const locCategory = useLocation().state.category;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <DefaultBanner banner={"Product Listing Page"} />
      <Grid align={"center"} padding={4} marginLeft={2} marginRight={2}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                    {locSeller}
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
              <Grid item xs={6} marginBottom={5} marginTop={2}>
                <Typography variant="h6">
                  {"Product Description: "}
                  {locDescription}
                </Typography>
              </Grid>
              <Grid item marginBottom={2}>
                <Typography style={{ color: "#FF0000", fontWeight: "bold" }}>
                  <CountdownTimer
                    countDownDate={locTimeLeft}
                    productPage={true}
                  />
                </Typography>
              </Grid>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#FF0000", fontWeight: "bold" }}>
                    {"Current Bid Price: "}
                    {locCurrentBid}
                  </Typography>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#228B22", fontWeight: "bold" }}>
                    {"Buy Now Price: "}
                    {locBuyNow}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-around"} marginTop={4}>
                <Button
                  variant="contained"
                  color="error"
                  type="reset"
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
            </Grid>
          </Grid>
        </form>
      </Grid>
    </ThemeProvider>
  );
}
