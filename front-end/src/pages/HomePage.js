import React from "react";
import { Grid } from "@mui/material";
import SubNavBar from "../components/SubNavBar.js";
import ProductCards from "../components/ProductCards.js";
import Couch from "../assets/Couch.jpg";
import Bike from "../assets/Bike.jpg";
import iPad from "../assets/iPad.jpg";
import Skateboard from "../assets/Skateboard.jpg";
import Textbook from "../assets/Textbook.jpg";

export default function HomePage() {
  return (
    <div>
      <SubNavBar />
      <Grid
        container
        alignItems="center"
        display="flex"
        justifyContent={"center"}
      >
        <ProductCards
          image={Couch}
          alt="Couch"
          itemName="New couch"
          currentBid={"$100"}
          buyNow={"$250"}
          timeLeft={"2 days 12 hours 10 minutes"}
        />
        <ProductCards
          image={Bike}
          alt="Bike"
          itemName="Bike"
          currentBid={"$150"}
          buyNow={"$200"}
          timeLeft={"1 days 8 hours 32 minutes"}
        />
        <ProductCards
          image={iPad}
          alt="iPad"
          itemName="Used iPad"
          currentBid={"$500"}
          buyNow={"$700"}
          timeLeft={"12 hours 10 minutes"}
        />
        <ProductCards
          image={Skateboard}
          alt="Skateboard"
          itemName="New Skateboard"
          currentBid={"$120"}
          buyNow={"N/A"}
          timeLeft={"3 days 3 hours 53 minutes"}
        />
        <ProductCards
          image={Textbook}
          alt="Textbook"
          itemName="Unused Textbook"
          currentBid={"$50"}
          buyNow={"$100"}
          timeLeft={"16 hours 14 minutes"}
        />
      </Grid>
    </div>
  );
}
