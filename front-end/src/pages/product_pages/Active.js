import { React, useEffect, useState } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import CountdownTimer from "../../components/CountdownTimer";

export default function Active(props) {
  const [products, setProducts] = useState([]);
  const [bid, setBid] = useState();
  const role = "Buyer";
  const madeBid = true;

  async function getData(url = `http://localhost:8080/product/${props.id}`) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        var d = data;
        setProducts(d);
        console.log(d);
      });
    return response;
  }

  useEffect(() => {
    getData();
  }, []);

  const oneDay = 24 * 60 * 60 * 1000;
  var timeLeft =
    new Date(products.expirationDate).getTime() - new Date().getTime();
  var delListing = false;
  var currentBid = props.currentBid;
  if (currentBid === null) {
    currentBid = "N/A";
  }
  // TODO Highest bidder logic
  // if user is highest bidder
  // role = "Highest-Bidder";

  // if user has been outbid
  // role = "Outbid";

  // if user has bid
  // withdraw bid

  if (timeLeft > oneDay) {
    delListing = true;
  }

  async function putBidorOffer(
    url = `http://localhost:8080/bid/${products.id}`
  ) {
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        bidAmount: bid,
      }),
    });
    return response.json();
  }

  async function deleteWithdrawBid(
    url = `http://localhost:8080/bid/${products.id}`
  ) {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    return response.json();
  }

  async function deleteListing(
    url = `http://localhost:8080/product/${products.id}`
  ) {
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    return response.json();
  }

  const handleBidorOffer = () => {
    if (products.currentBid === null) {
      setBid(products.openingBid);
    } else {
      const newBid = products.currentBid + products.bidIncrement;
      setBid(newBid);
    }
    putBidorOffer();
  };

  const handleWithdrawBid = () => {
    deleteWithdrawBid();
  };

  const handleDeleteListing = () => {
    deleteListing();
  };

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
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Grid item xs={5}>
            <Box
              component="img"
              sx={{
                width: "35vw",
                height: "100%",
                overflow: "hidden",
                display: "block",
              }}
              src={products.coverImage}
            />
          </Grid>
          <Grid
            item
            xs={7}
            direction="column"
            marginTop={2}
            sx={{
              maxWidth: "50vw",
              maxHeight: "50vh",
            }}
          >
            <Grid
              item
              xs={2}
              marginBottom={2}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "15px",
                justifyItems: "center",
                maxWidth: "80%",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {products.title}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={6} marginBottom={2}>
                <Typography style={{ color: "#4169E1" }}>
                  {"Seller: "}
                  {products.sellerName}
                </Typography>
              </Grid>
              <Grid item xs={5.9} marginBottom={2}>
                <Typography style={{ color: "#4169E1" }}>
                  {"Category: "}
                  {products.category}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={6} marginBottom={2}>
                <Typography>
                  {"Condition: "}
                  {products.condition}
                </Typography>
              </Grid>
              <Grid item xs={6} marginBottom={2}>
                <Typography>
                  {"Location of Exchange: "}
                  {products.location}
                </Typography>
              </Grid>
            </Grid>
            <Grid container marginBottom={2}>
              <Grid
                item
                xs={12}
                marginBottom={5}
                marginTop={2}
                sx={{
                  maxWidth: "40vw",
                  justifyContent: "left",
                  justifyItems: "left",
                  alignText: "left",
                }}
              >
                <Typography variant="p" sx={{ lineHeight: "1.5" }}>
                  {products.description}
                </Typography>
              </Grid>
              <Grid item xs={12} marginBottom={2}>
                <Typography style={{ color: "#FF0000", fontWeight: "bold" }}>
                  <CountdownTimer
                    countDownDate={products.expirationDate}
                    productPage={true}
                  />
                </Typography>
              </Grid>
            </Grid>
            {products.listingType === "Bid Only" ? (
              <Grid container>
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#4169E1", fontWeight: "bold" }}>
                    {"Current Bid Placed: $"}
                    {currentBid}
                  </Typography>
                </Grid>
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#4169E1", fontWeight: "bold" }}>
                    {"Next Bid: $"}
                    {products.nextBid}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <div>
                <Grid item xs={6} marginBottom={2}>
                  <Typography style={{ color: "#228B22", fontWeight: "bold" }}>
                    {"Listing Price: $"}
                    {products.listingPrice}
                  </Typography>
                </Grid>
              </div>
            )}
            <Grid container justifyContent="space-between" marginBottom={2}>
              {products.sellerId !== "Parwaz" ? (
                <Grid
                  container
                  justifyContent={"space-evenly"}
                  marginBottom={2}
                >
                  {products.listingType === "Bid-Only" ? (
                    <React.Fragment>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={handleBidorOffer()}
                        sx={{
                          background: "#333",
                          color: "white",
                          outline: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "10px 25px",
                        }}
                      >
                        Place Bid
                      </Button>
                      {madeBid ? (
                        <Button
                          variant="contained"
                          color="info"
                          sx={{
                            background: "#333",
                            color: "white",
                            outline: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "10px 25px",
                          }}
                          onClick={handleWithdrawBid()}
                        >
                          Withdraw Bid
                        </Button>
                      ) : null}
                    </React.Fragment>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        background: "#333",
                        color: "white",
                        outline: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "10px 25px",
                      }}
                      onClick={handleBidorOffer()}
                    >
                      Make Offer
                    </Button>
                  )}
                </Grid>
              ) : (
                <Grid
                  container
                  justifyContent={"space-evenly"}
                  marginBottom={2}
                >
                  {deleteListing ? (
                    <Grid
                      container
                      justifyContent={"space-evenly"}
                      marginBottom={2}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          background: "error",
                          color: "white",
                          outline: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "10px 25px",
                        }}
                        onClick={handleDeleteListing()}
                      >
                        Delete Listing
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
