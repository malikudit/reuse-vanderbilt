import { React, useState } from "react";
import {
  Grid,
  InputLabel,
  Button,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from "@mui/material";
import DefaultBanner from "../components/DefaultBanner";

export default function CreateListingsPage() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [bid, setBid] = useState("");
  const [bidError, setBidError] = useState(false);
  const [buy, setBuy] = useState("");
  const [buyError, setBuyError] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange2 = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // use a map here or something
    setTitleError(false);
    setDetailsError(false);
    setBidError(false);
    setBuyError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (details === "") {
      setDetailsError(true);
    }
    if (bid === "") {
      setBidError(true);
    }
    if (buy === "") {
      setBuyError(true);
    }
    if (title && details && bid && buy) {
      console.log(title, details, age, bid, buy, address);
      alert("Thank you for creating this listing");
    }
  };

  return (
    <div>
      <DefaultBanner banner={"Create New Listings"} />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2} marginTop={4} marginLeft={15}>
          <Grid item xs={6} container>
            <TextField
              label="Upload Photo"
              variant="outlined"
              required
              style={{ width: "90%" }}
              multiline
              rows={18}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    component="label"
                    size="large"
                    sx={{ width: 150, height: 60 }}
                  >
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                ),
              }}
            />
          </Grid>
          <Grid container xs={6} direction="column" marginTop={2}>
            <Grid item xs={2}>
              <TextField
                // fullWidth
                onChange={(e) => setTitle(e.target.value)}
                label="Enter Product Title"
                variant="outlined"
                style={{ width: "70%" }}
                required
                error={titleError}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                onChange={(e) => setDetails(e.target.value)}
                label="Enter Product Description (max 300 characters)" // need some sort of validation here
                variant="outlined"
                // multiline
                // rows={4}
                style={{ width: "70%" }}
                required
                error={detailsError}
                fullwidth
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl style={{ width: "70%" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Condition
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"New"}>New</MenuItem>
                  <MenuItem value={"Good"}>Good</MenuItem>
                  <MenuItem value={"Bad"}>Bad</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                // fullWidth
                onChange={(e) => setBid(e.target.value)}
                label="Open Bid Price"
                variant="outlined"
                style={{ width: "70%" }}
                required
                error={bidError}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                // fullWidth
                onChange={(e) => setBuy(e.target.value)}
                label="Buy Now Price"
                variant="outlined"
                style={{ width: "70%" }}
                required
                error={buyError}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl style={{ width: "70%" }}>
                <InputLabel id="demo-simple-select-label">
                  Prefer To Exchange
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={address}
                  label="Address"
                  onChange={handleChange2}
                >
                  <MenuItem value={"Seller Delivery"}>Seller Delivery</MenuItem>
                  <MenuItem value={"Buyer Pickup"}>Buyer Pickup</MenuItem>
                  <MenuItem value={"Meet at Common Point"}>
                    Meet at Common Point
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            {" "}
          </Grid>
          <Grid item xs={3}>
            <Button
              ariant="contained"
              color="error"
              type="reset"
              onClick="this.form.reset();"
            >
              Cancel Listing
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button ariant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
