import { React, useState } from "react";
import {
  Grid,
  InputLabel,
  Button,
  MenuItem,
  Select,
  FormControl,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
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

export default function ProductPage() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [bid, setBid] = useState("");
  const [buy, setBuy] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");

  const handleCondition = (event) => {
    setCondition(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && details && bid && buy) {
      alert("Thank you for creating this listing");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <DefaultBanner banner={"Product Page"} />{" "}
      {
        // props.ItemName
      }
      <Grid align={"center"} padding={4}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6} container flex>
              <TextField
                disabled
                label="Picture Goes Here"
                variant="outlined"
                style={{ width: "90%" }}
                multiline
                rows={18}
              />
            </Grid>
            <Grid xs={6} direction="column" marginTop={2}>
              <Grid item xs={2} marginBottom={2}>
                <TextField
                  disabled
                  // onChange={(e) => setTitle(e.target.value)}
                  label="Product Title" // props.ItemName
                  variant="outlined"
                  // error={titleError}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} marginBottom={2}>
                <TextField
                  disabled
                  // onChange={(e) => setDetails(e.target.value)}
                  label="Product Description" // props.description
                  variant="outlined"
                  rows={4}
                  multiline
                  // error={detailsError}
                  fullWidth
                />
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={5.9} marginBottom={2}>
                  <TextField
                    disabled
                    // onChange={(e) => setTitle(e.target.value)}
                    label="Seller" // props.condition
                    variant="outlined"
                    // error={titleError}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5.9} marginBottom={2}>
                  <TextField
                    disabled
                    // onChange={(e) => setTitle(e.target.value)}
                    label="Category" // props.condition
                    variant="outlined"
                    // error={titleError}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={5.9} marginBottom={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Condition
                    </InputLabel>
                    <Select
                      disabled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={condition} // props.condition
                      label="Condition"
                      // error={conditionError ? true : false}
                      // onChange={handleCondition}
                    >
                      <MenuItem value={"Brand New"}>Brand New</MenuItem>
                      <MenuItem value={"Like New"}>Like New</MenuItem>
                      <MenuItem value={"Slightly Used"}>Slightly Used</MenuItem>
                      <MenuItem value={"Used"}>Used</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5.9} marginBottom={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Location of Exchange
                    </InputLabel>
                    <Select
                      disabled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // error={locationError ? true : false}
                      value={location} // props.location
                      label="Location"
                      // onChange={handleLocation}
                    >
                      <MenuItem value={"Seller Will Deliver to Buyer"}>
                        Seller Will Deliver to Buyer
                      </MenuItem>
                      <MenuItem value={"Buyer Will Come to Seller"}>
                        Buyer Will Come to Seller
                      </MenuItem>
                      <MenuItem value={"Buyer and Seller Meet at Common Point"}>
                        Buyer and Seller Meet at Common Point
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={5.9} marginBottom={2}>
                  <TextField
                    disabled
                    // onChange={(e) => setBid(e.target.value)}
                    // value = props.currentBid
                    label="Current Bidding Price"
                    variant="outlined"
                    // error={bidError}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5.9} marginBottom={2}>
                  <TextField
                    disabled
                    // onChange={(e) => setBuy(e.target.value)}
                    // value = props.buyNow
                    label="Current Buy Now Price"
                    variant="outlined"
                    required
                    // error={buyError}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-around"}>
                <Button
                  variant="contained"
                  required
                  color="info"
                  type="reset"
                  onClick="this.form.reset()"
                >
                  Bid Now
                </Button>

                <Button variant="contained" color="success" type="submit">
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