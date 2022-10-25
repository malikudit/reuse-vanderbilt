import { React } from "react";
import {
  Box,
  Grid,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
  Rating,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import DefaultBanner from "../components/DefaultBanner";

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

export default function ReviewPage() {
  const locImage = useLocation().state.image;
  const locReviewTitle = useLocation().state.reviewTitle;
  const locReviewBody = useLocation().state.reviewBody;
  const locSeller = useLocation().state.seller;
  const locRating = useLocation().state.rating;
  const locCategory = useLocation().state.category;
  const locCondition = useLocation().state.condition;
  const locLocation = useLocation().state.location;
  const locSalePrice = useLocation().state.salePrice;

  return (
    <ThemeProvider theme={theme}>
      <DefaultBanner banner={"Review Page"} />{" "}
      <Grid align={"center"} padding={4} marginLeft={2} marginRight={2}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Box
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                }}
                src={locImage}
              />
            </Grid>
            <Grid xs={7} direction="column" marginTop={2}>
              <Grid item marginBottom={2}>
                <Typography
                  variant="h4"
                  borderBottom={1}
                  sx={{ fontWeight: "bold" }}
                >
                  {"Review Title: "}
                  {locReviewTitle}
                </Typography>
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#4169E1" }}>
                    {"Seller: "}
                    {locSeller}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  marginBottom={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography>Rating:</Typography>
                  <Rating
                    name="read-only"
                    value={locRating}
                    precision={0.5}
                    readOnly
                    align="center"
                    size="large"
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#4169E1" }}>
                    {"Category: "}
                    {locCategory}
                  </Typography>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Typography>
                    {"Condition: "}
                    {locCondition}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"} borderBottom={1}>
                <Grid item xs={6} marginBottom={2}>
                  <Typography>
                    {"Location of Exchange: "}
                    {locLocation}
                  </Typography>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#228B22" }}>
                    {"Sale Price: "}
                    {locSalePrice}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item marginBottom={5} marginTop={2}>
                <Typography variant="h6">
                  {"Review Body: "}
                  {locReviewBody}
                </Typography>
              </Grid>
              <Grid container justifyContent={"space-around"} marginTop={4}>
                <Button
                  variant="contained"
                  required
                  color="error"
                  type="reset"
                  onClick="this.form.reset()"
                >
                  Edit Review
                </Button>
                <Button variant="contained" color="success" type="submit">
                  Save Review
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </ThemeProvider>
  );
}
