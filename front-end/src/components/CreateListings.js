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
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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

export default function CreateListings() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [condition, setCondition] = useState("");
  const [conditionError, setConditionError] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [date, setDate] = useState(dayjs(""));
  const [dateError, setDateError] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [allowBid, setAllowBid] = useState();
  const [allowBidError, setAllowBidError] = useState(false);
  const [bid, setBid] = useState("");
  const [bidError, setBidError] = useState(false);
  const [bidIncrement, setBidIncrement] = useState("");
  const [bidIncrementError, setBidIncrementError] = useState(false);
  const [buy, setBuy] = useState("");
  const [buyError, setBuyError] = useState("");
  const [allowBuy, setAllowBuy] = useState();
  const [allowBuyError, setAllowBuyError] = useState(false);
  const [listingType, setListingType] = useState("");
  const [error, setError] = useState(false);
  const [printErr, setPrintErr] = useState("");

  const handleCondition = (event) => {
    setCondition(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDate = (date) => {
    setDate();
    setDateError(false);
    var now = new Date().getTime();
    if (date - now > 12096e5 || date - now < 1.08e7) {
      setDateError(true);
    } else {
      date = dayjs(date).toISOString();
      setDate(date);
    }
  };

  const handleAllowBid = (event) => {
    setAllowBid(event.target.value);
  };

  const handleAllowBuy = (event) => {
    setAllowBuy(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDescriptionError(false);
    setConditionError(false);
    setDateError(false);
    setCategoryError(false);
    setBidError(false);
    setAllowBidError(false);
    setBidIncrementError(false);
    setBuyError(false);
    setAllowBuyError(false);
    setLocationError(false);
    setError(false);

    if (title === "") {
      setTitleError(true);
      setError(true);
    }
    if (description === "") {
      setDescriptionError(true);
      setError(true);
    }
    if (condition === "") {
      setConditionError(true);
      setError(true);
    }
    if (location === "") {
      setLocationError(true);
      setError(true);
    }
    if (date === "") {
      setDateError(true);
      setError(true);
    }
    if (category === "") {
      setCategoryError(true);
      setError(true);
    }
    if (bid === "") {
      setBidError(true);
      setError(true);
    }
    if (bidIncrement === "") {
      setBidIncrementError(true);
      setError(true);
    }
    if (allowBid === "") {
      setAllowBidError(true);
      setError(true);
    }
    if (buy === "") {
      setBuyError(true);
      setError(true);
    }
    if (allowBuy === "") {
      setBuyError(true);
      setError(true);
    }

    if (bid && buy) {
      setListingType("Bid-And-Buy-Now");
    } else if (bid && !buy) {
      setListingType("Bid-Only");
    } else if (buy && !bid) {
      setListingType("Buy-Only");
    }
    const obj = {};
    obj.title = title;
    obj.description = description;
    obj.category = category;
    obj.condition = condition;
    obj.listingType = listingType;
    obj.listingPrice = buy;
    obj.openBidPrice = bid;
    obj.bidIncrement = bidIncrement;
    obj.currentBid = bid;
    obj.buyNow = buy;
    obj.expirationDate = date;
    obj.location = location;

    if (!error) {
      console.log("Object is " + obj);
      async function postData(url = "", data = obj) {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          body: JSON.stringify({
            product: data,
          }),
        });
        console.log("Response.json " + response.json());
        return response.json();
      }

      postData("http://api.reuse-vandy.org/product").then((data) => {
        if (data.error) {
          setPrintErr(data.error);
          console.log(printErr);
        } else {
          alert("Listing Posted Successfully!");
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6} container flex>
                <TextField
                  label="Upload Between 1-3 Photos of Your Product"
                  variant="outlined"
                  required
                  style={{ width: "90%" }}
                  multiline
                  rows={18}
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        color="info"
                        component="label"
                        size="large"
                        sx={{
                          width: 150,
                          height: 60,
                        }}
                      >
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={6} direction="column" marginTop={2}>
                <Grid item xs={2} marginBottom={2}>
                  <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    label="Enter Product Title (between 5-32 characters)"
                    variant="outlined"
                    required
                    error={titleError}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2} marginBottom={2}>
                  <TextField
                    onChange={(e) => setDescription(e.target.value)}
                    label="Enter Product Description (maximum 300 characters)"
                    variant="outlined"
                    rows={4}
                    multiline
                    error={descriptionError}
                    fullWidth
                  />
                </Grid>
                <Grid container justifyContent="space-between">
                  <Grid item xs={5.9} marginBottom={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Condition
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={condition}
                        label="Condition"
                        required
                        error={conditionError ? true : false}
                        onChange={handleCondition}
                      >
                        <MenuItem value={"New"}>New</MenuItem>
                        <MenuItem value={"Like New"}>Like New</MenuItem>
                        <MenuItem value={"Slightly Used"}>
                          Slightly Used
                        </MenuItem>
                        <MenuItem value={"Used"}>Used</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} marginBottom={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Prefer To Exchange
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        error={locationError ? true : false}
                        value={location}
                        label="Location"
                        onChange={handleLocation}
                      >
                        <MenuItem value={"Seller Delivers to Buyer"}>
                          Seller Will Deliver to Buyer
                        </MenuItem>
                        <MenuItem value={"Buyer Comes to Seller"}>
                          Buyer Will Come to Seller
                        </MenuItem>
                        <MenuItem value={"Exchange at Common Point"}>
                          Buyer and Seller Meet at Common Point
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container marginBottom={2} justifyContent="space-between">
                  <Grid item xs={5.9} marginBottom={2}>
                    <DateTimePicker
                      label="Date Sale Expires"
                      value={date}
                      required
                      onChange={(date) => {
                        handleDate(date);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={dateError ? true : false}
                          helperText={
                            dateError
                              ? "Listings must be at least 3 hours in the future and can be no longer than 14 days ahead"
                              : ""
                          }
                          sx={{ width: "100%" }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        error={categoryError ? true : false}
                        value={category}
                        label="Category"
                        onChange={handleCategory}
                      >
                        <MenuItem value={"Books"}>Books</MenuItem>
                        <MenuItem value={"Clothing"}>Clothing</MenuItem>
                        <MenuItem value={"Electronics"}>Electronics</MenuItem>
                        <MenuItem value={"Furniture"}>Furniture</MenuItem>
                        <MenuItem value={"Kitchen"}>Kitchen</MenuItem>
                        <MenuItem value={"Tickets"}>Tickets</MenuItem>
                        <MenuItem value={"Transportation"}>
                          Transportation
                        </MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Grid item xs={5.9} marginBottom={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Allow Bidding?
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={allowBid}
                        label="Allow Bid"
                        required
                        error={allowBidError ? true : false}
                        onChange={handleAllowBid}
                      >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {allowBid ? (
                    <Grid container>
                      <Grid item xs={6} marginBottom={2}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Allow Buy Now Price?
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={allowBuy}
                            label="Allow Buy Now"
                            required
                            error={allowBuyError ? true : false}
                            onChange={handleAllowBuy}
                          >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {allowBuy ? (
                        <Grid container justifyContent={"space-between"}>
                          <Grid item xs={6} marginBottom={2}>
                            <TextField
                              onChange={(e) => setBid(e.target.value)}
                              label="Set Starting Bid Price"
                              variant="outlined"
                              required
                              error={bidError}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6} marginBottom={2}>
                            <TextField
                              onChange={(e) => setBidIncrement(e.target.value)}
                              label="Set Bid Increment"
                              variant="outlined"
                              required
                              error={bidIncrementError}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6} marginBottom={2}>
                            <TextField
                              onChange={(e) => setBuy(e.target.value)}
                              label="Set Buy Now Price"
                              variant="outlined"
                              required
                              error={buyError}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid container>
                          <Grid item xs={6} marginBottom={2}>
                            <TextField
                              onChange={(e) => setBid(e.target.value)}
                              label="Set Starting Bid Price"
                              variant="outlined"
                              required
                              error={bidError}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6} marginBottom={2}>
                            <TextField
                              onChange={(e) => setBidIncrement(e.target.value)}
                              label="Set Bid Increment"
                              variant="outlined"
                              required
                              error={bidIncrementError}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  ) : (
                    <Grid item xs={5.9} marginBottom={2}>
                      <TextField
                        onChange={(e) => setBuy(e.target.value)}
                        label="Set Listing Price"
                        variant="outlined"
                        required
                        error={buyError}
                        fullWidth
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid container justifyContent={"space-around"}>
                  <Button
                    variant="contained"
                    required
                    color="error"
                    type="reset"
                    onClick="this.form.reset()"
                  >
                    Cancel Listing
                  </Button>

                  <Button variant="contained" color="success" type="submit">
                    Post Listing
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
