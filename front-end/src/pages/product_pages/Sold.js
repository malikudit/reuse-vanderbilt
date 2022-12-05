import { React } from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";

export default function Sold(props) {
  // fetch if a user has left a review or not
  const leftReview = false;
  const role = "Seller";
  var userID;
  if (role === "Buyer") {
    userID = props.buyerId;
  } else {
    userID = props.sellerId;
  }

  return (
    <Grid
      align={"center"}
      padding={4}
      marginLeft={2}
      marginRight={2}
      sx={{
        boxShadow: "0 0 5px #ccc",
        margin: "10vh",
        width: "90vw",
        height: "auto",
        paddingBottom: "7vh",
      }}
    >
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "75vh",
                maxWidth: "75vw",
              }}
              src={props.coverImage}
            />
          </Grid>
          <Grid item xs={7} direction="column" marginTop={2}>
            <Grid item xs={12} marginBottom={2} marginTop={2}>
              <Typography
                variant="h6"
                style={{ color: "#228B22", fontWeight: "bold" }}
              >
                Sale completed!
              </Typography>
              <Typography
                variant="h6"
                style={{ color: "#228B22", fontWeight: "bold" }}
              >
                Contact the individual you are exchanging with at the following:
              </Typography>
            </Grid>
            <Grid item xs={12} marginBottom={2} marginTop={2}>
              <Typography variant="h6">
                Person exchanging with:
                {" " + props.sellerName}
              </Typography>
              <Typography variant="h6">
                Contact information:
                {" Insert Phone/GroupMe"}
              </Typography>
            </Grid>
            <Grid container justifyContent={"center"}>
              <Grid marginBottom={2}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    background: "white",
                    text: "black",
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 25px",
                  }}
                >
                  {leftReview ? (
                    <Link
                      to={{ pathname: `/profile/${userID}` }}
                      style={{ textDecoration: "none" }}
                    >
                      View Profile of {role}
                    </Link>
                  ) : (
                    <Link
                      to={{ pathname: `/new_review/${props.id}` }}
                      state={{
                        itemName: props.itemName,
                        coverImage: props.coverImage,
                        // secondaryImage1: props.secondaryImage1,
                        // secondaryImage2: props.secondaryImage2,
                        // secondaryImage3: props.secondaryImage3,
                        // secondaryImage4: props.secondaryImage4,
                        sellerID: props.sellerID,
                        sellerName: props.sellerName,
                        category: props.category,
                        condition: props.condition,
                        location: props.location,
                        salePrice: props.salePrice,
                        id: props.id,
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      Leave a Review
                    </Link>
                  )}
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={2} marginTop={2} marginBottom={2}>
              <Typography
                variant="h5"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {props.itemName}
              </Typography>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: "40vw",
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography style={{ color: "#4169E1" }} variant="p">
                  {"Seller: "}
                  {props.sellerName}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: "40vw",
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography variant="p">
                  {"Exchange location: "}
                  {props.location}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              marginBottom={1}
              sx={{
                maxWidth: "40vw",
              }}
            >
              <Grid item xs={12} marginBottom={1} marginTop={1}>
                <Typography variant="p">{props.description}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
