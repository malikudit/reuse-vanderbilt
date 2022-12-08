import { React, useState } from 'react';
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
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import swal from 'sweetalert';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DAA520',
    },
    secondary: {
      main: '#212121',
    },
    neutral: {
      main: '#ffffff',
    },
    info: {
      main: '#4169E1',
    },
    success: {
      main: '#228B22',
    },
    background: {
      default: '#696969',
    },
  },
});

export default function CreateListings() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [condition, setCondition] = useState('');
  const [conditionError, setConditionError] = useState('');
  const [location, setLocation] = useState('');
  const [locationError, setLocationError] = useState('');
  const [date, setDate] = useState(dayjs(''));
  const [dateError, setDateError] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [listingType, setListingType] = useState('');
  const [listingTypeError, setListingTypeError] = useState('');
  const [openingBid, setOpeningBid] = useState('');
  const [openingBidError, setOpeningBidError] = useState('');
  const [bidIncrement, setBidIncrement] = useState('');
  const [bidIncrementError, setBidIncrementError] = useState(false);
  const [listingPrice, setListingPrice] = useState('');
  const [listingPriceError, setListingPriceError] = useState(false);
  const [error, setError] = useState(false);
  const [printErr, setPrintErr] = useState('');
  const [coverImage, setCoverImage] = useState();

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
    // if (date - now > 12096e5 || date - now < 1.08e7) {
    // setDateError(true);
    // } else {
    date = dayjs(date).toISOString();
    setDate(date);
    // }
  };

  const handleListingType = (event) => {
    setListingType(event.target.value);
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
    setBidIncrementError(false);
    setListingTypeError(false);
    setLocationError(false);
    setError(false);
    if (coverImage === undefined) {
      setError(true);
    }
    if (title === '') {
      setTitleError(true);
      setError(true);
    }
    if (description === '') {
      setDescriptionError(true);
      setError(true);
    }
    if (condition === '') {
      setConditionError(true);
      setError(true);
    }
    if (location === '') {
      setLocationError(true);
      setError(true);
    }
    if (date === '') {
      setDateError(true);
      setError(true);
    }
    if (category === '') {
      setCategoryError(true);
      setError(true);
    }
    if (listingType === '') {
      setListingTypeError(true);
      setError(true);
    }
    if (listingType === 'Bid Only') {
      if (openingBid === '') {
        setOpeningBidError(true);
        setError(true);
      }
      if (bidIncrement === '') {
        setBidIncrementError(true);
        setError(true);
      }
    } else {
      if (listingPrice === '') {
        setListingPriceError(true);
        setError(true);
      }
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('condition', condition);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('listingType', listingType);
    formData.append('expirationDate', date);
    if (listingType === 'Bid Only') {
      formData.append('openBidPrice', openingBid);
      formData.append('bidIncrement', bidIncrement);
    } else {
      formData.append('listingPrice', listingPrice);
    }
    formData.append('coverImage', coverImage);

    if (!error) {
      postData('https://api.reusevandy.org/product', formData).then((data) => {
        if (data.error) {
          swal('Oops!', data.error, 'error');
          window.location.reload(false);
        } else {
          swal('Success', 'Product listed', 'success').then(function () {
            window.location.href = '/';
          });
        }
      });

      async function postData(
        url = 'https://api.reusevandy.org/product',
        data = formData
      ) {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
          redirect: 'follow',
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              swal('Oops!', data.error, 'error');
              window.location.href = '#/profile';
            }
          });
        return response;
      }
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid xs={8} direction="column" marginTop={2}>
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
                  <Typography variant="h7">
                    Upload cover image (required){' '}
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: 'white',
                    }}
                  >
                    <input
                      required
                      type="file"
                      accept=".jpeg, .png"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setCoverImage(file);
                      }}
                    />
                  </Button>
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
                        <MenuItem value={'New'}>New</MenuItem>
                        <MenuItem value={'Like New'}>Like New</MenuItem>
                        <MenuItem value={'Slightly Used'}>
                          Slightly Used
                        </MenuItem>
                        <MenuItem value={'Used'}>Used</MenuItem>
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
                        <MenuItem value={'Seller Delivers to Buyer'}>
                          Seller Will Deliver to Buyer
                        </MenuItem>
                        <MenuItem value={'Buyer Comes to Seller'}>
                          Buyer Will Come to Seller
                        </MenuItem>
                        <MenuItem value={'Exchange at Common Point'}>
                          Buyer and Seller Meet at Common Point
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container marginBottom={2} justifyContent="space-between">
                  <Grid item xs={5.9}>
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
                              ? 'Listings must be at least 3 hours in the future and can be no longer than 14 days ahead'
                              : ''
                          }
                          sx={{ width: '100%' }}
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
                        <MenuItem value={'Books'}>Books</MenuItem>
                        <MenuItem value={'Clothing'}>Clothing</MenuItem>
                        <MenuItem value={'Electronics'}>Electronics</MenuItem>
                        <MenuItem value={'Furniture'}>Furniture</MenuItem>
                        <MenuItem value={'Kitchen'}>Kitchen</MenuItem>
                        <MenuItem value={'Tickets'}>Tickets</MenuItem>
                        <MenuItem value={'Transportation'}>
                          Transportation
                        </MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container justifyContent={'space-between'}>
                  <Grid item xs={5.9} marginBottom={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Listing Type?
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={listingType}
                        label="Allow Buy Now"
                        required
                        error={listingTypeError ? true : false}
                        onChange={handleListingType}
                      >
                        <MenuItem value={'Bid Only'}>Bid Only</MenuItem>
                        <MenuItem value={'Listing Price'}>
                          Buy Now Only
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {listingType === 'Bid Only' ? (
                    <Grid container justifyContent="space-between">
                      <Grid item xs={5.9} marginBottom={2}>
                        <TextField
                          onChange={(e) => setOpeningBid(e.target.value)}
                          label="Set Opening Bid"
                          variant="outlined"
                          required
                          error={openingBidError}
                          fullWidth
                        >
                          Opening Bid
                        </TextField>
                      </Grid>
                      <Grid item xs={6} marginBottom={2}>
                        <TextField
                          onChange={(e) => setBidIncrement(e.target.value)}
                          label="Set Bid Increment"
                          variant="outlined"
                          required
                          error={bidIncrementError}
                          fullWidth
                        >
                          Bid Increment
                        </TextField>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid item xs={6} marginBottom={2}>
                      <TextField
                        onChange={(e) => setListingPrice(e.target.value)}
                        label="Set Listing Price"
                        variant="outlined"
                        required
                        error={listingPriceError}
                        fullWidth
                      >
                        Bid Increment
                      </TextField>
                    </Grid>
                  )}
                </Grid>
                <Grid container justifyContent={'space-around'}>
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
