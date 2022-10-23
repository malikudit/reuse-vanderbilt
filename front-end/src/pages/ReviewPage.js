import { React } from "react";
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
  Typography,
  Rating,
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

export default function ReviewPage() {
  return (
    <ThemeProvider theme={theme}>
      <DefaultBanner banner={"Review Page"} />{" "}
      <Grid align={"center"} padding={4}>
        <form noValidate autoComplete="off">
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
              <Grid item marginBottom={2}>
                <TextField
                  disabled
                  // onChange={(e) => setTitle(e.target.value)}
                  label="Review Title" // props.reviewTitle
                  variant="outlined"
                  // error={titleError}
                  fullWidth
                />
              </Grid>
              <Grid item marginBottom={2}>
                <TextField
                  disabled
                  // onChange={(e) => setDetails(e.target.value)}
                  label="Review Body" // props.description
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
                <Grid
                  item
                  xs={5.9}
                  marginBottom={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h4">Rating:</Typography>
                  <Rating
                    name="read-only"
                    value={4.5}
                    precision={0.5}
                    readOnly
                    align="center"
                    size="large"
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
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
                <Grid item xs={5.9} marginBottom={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Condition
                    </InputLabel>
                    <Select
                      disabled
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
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
              </Grid>
              <Grid container justifyContent={"space-between"}>
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
              </Grid>
              <Grid container justifyContent={"space-around"}>
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
