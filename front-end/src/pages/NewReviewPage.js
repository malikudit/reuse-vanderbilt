import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import DefaultBanner from "../components/DefaultBanner";
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

export default function NewReviewPage(props) {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewStars, setReviewStars] = useState(undefined);
  const [reviewBody, setReviewBody] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [starsError, setStarsError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [error, setError] = useState(false);
  const [printErr, setPrintErr] = useState("");

  const itemName = useLocation().state.itemName;
  const image = useLocation().state.image;
  const sellerID = useLocation().state.sellerID;
  const sellerName = useLocation().state.sellerName;
  const category = useLocation().state.category;
  const condition = useLocation().state.condition;
  const location = useLocation().state.location;
  const salePrice = useLocation().state.salePrice;

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setStarsError(false);
    setBodyError(false);

    if (reviewTitle === "") {
      setTitleError(true);
      setError(true);
    }
    if (reviewStars === undefined) {
      setStarsError(true);
      setError(true);
    }
    if (reviewBody === "") {
      setBodyError(true);
      setError(true);
    }

    const obj = {};
    obj.reviewTitle = reviewTitle;
    obj.reviewStars = reviewStars;
    obj.reviewBody = reviewBody;

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

      postData("http://api.reuse-vandy.org/review").then((data) => {
        if (data.error) {
          setPrintErr(data.error);
          console.log(printErr);
        } else {
          alert("Review Added Successfully!");
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <div>
      <DefaultBanner banner={"Review Page"} />
      <Grid align={"center"} padding={4} marginLeft={2} marginRight={2}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Box
                component="img"
                sx={{
                  height: "100%",
                  width: "100%",
                }}
                src={image}
              />
            </Grid>
            <Grid xs={7} direction="column" marginTop={2}>
              <Grid item marginBottom={2}>
                <Typography
                  variant="h4"
                  borderBottom={1}
                  sx={{ fontWeight: "bold" }}
                >
                  {"Product Name: "}
                  {itemName}
                </Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#4169E1" }}>
                    {"Seller: "}
                    {sellerName}
                  </Typography>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#4169E1" }}>
                    {"Category: "}
                    {category}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={6} marginBottom={2}>
                  <Typography>
                    {"Condition: "}
                    {condition}
                  </Typography>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Typography>
                    {"Location of Exchange: "}
                    {location}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"} borderBottom={1}>
                <Grid item xs={12} marginBottom={2}>
                  <Typography style={{ color: "#228B22" }}>
                    {"Sale Price: "}
                    {salePrice}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="center"
                xs={10}
                marginBottom={5}
                marginTop={2}
              >
                <Grid xs={12} marginBottom={2}>
                  <TextField
                    fullWidth
                    label="Review Title"
                    onChange={(event) => setReviewTitle(event.target.value)}
                    error={titleError}
                  />
                </Grid>
                <Grid xs={12} marginBottom={2}>
                  <Typography>
                    Rate the exchange experience out of 5 stars
                  </Typography>
                  {starsError ? (
                    <Typography style={{ color: "red" }}>
                      {"Please select a rating"}
                    </Typography>
                  ) : null}
                  <Rating
                    precision={0.5}
                    onChange={(newValue) => {
                      setReviewStars(newValue);
                    }}
                    error={starsError}
                  />
                </Grid>
                <Grid xs={12} marginBottom={2}>
                  <TextField
                    fullWidth
                    label="Review Body"
                    multiline
                    rows={10}
                    onChange={(event) => setReviewBody(event.target.value)}
                    error={bodyError}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-around"} marginTop={4}>
                <Button variant="contained" color="success" type="submit">
                  Save Review
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
}
