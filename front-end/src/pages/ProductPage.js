import { React } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";
import DefaultBanner from "../components/DefaultBanner";
import Active from "./product_pages/Active";
import Inactive from "./product_pages/Inactive";
import EvaluatingOffers from "./product_pages/EvaluatingOffers";
import Sold from "./product_pages/Sold";

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
  const locCoverImage = useLocation().state.coverImage;
  const locSecondaryImage1 = useLocation().state.secondaryImage1;
  const locSecondaryImage2 = useLocation().state.secondaryImage2;
  const locSecondaryImage3 = useLocation().state.secondaryImage3;
  const locSecondaryImage4 = useLocation().state.secondaryImage4;
  const locItemName = useLocation().state.title;
  const locDescription = useLocation().state.description;
  const locSellerName = useLocation().state.seller;
  const locCondition = useLocation().state.condition;
  const locLocation = useLocation().state.location;
  const locListingType = useLocation().state.listingType;
  var locOpeningBid = useLocation().state.openingBid;
  var locCurrentBid = useLocation().state.currentBid;
  const locBidIncrement = useLocation().state.bidIncrement;
  const locListingPrice = useLocation().state.listingPrice;
  const locTimeLeft = useLocation().state.expirationDate;
  const locCategory = useLocation().state.category;
  const locSellerID = useLocation().state.sellerID;
  const locRole = useLocation().state.role;
  var locState = useLocation().state.state;
  if (locCurrentBid === null) {
    locCurrentBid = locOpeningBid;
  }
  const nextBid = locCurrentBid + " + " + locBidIncrement;
  var timeLeft = new Date(locTimeLeft).getTime();
  var now = new Date().getTime();
  var expired = timeLeft - now;
  locState = "Active";

  if (locState === "Active") {
    return (
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={"Product Listing Page"} />
        <Active
          coverImage={locCoverImage}
          secondaryImage1={locSecondaryImage1}
          secondaryImage2={locSecondaryImage2}
          secondaryImage3={locSecondaryImage3}
          secondaryImage4={locSecondaryImage4}
          itemName={locItemName}
          sellerID={locSellerID}
          sellerName={locSellerName}
          category={locCategory}
          condition={locCondition}
          location={locLocation}
          timeLeft={locTimeLeft}
          currentBid={locCurrentBid}
          openingBid={locOpeningBid}
          listingType={locListingType}
          nextBid={nextBid}
          listingPrice={locListingPrice}
          description={locDescription}
        />
      </ThemeProvider>
    );
  }

  if (locState === "Inactive") {
    return (
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={"Product Listing Page"} />
        <Inactive
          coverImage={locCoverImage}
          secondaryImage1={locSecondaryImage1}
          secondaryImage2={locSecondaryImage2}
          secondaryImage3={locSecondaryImage3}
          secondaryImage4={locSecondaryImage4}
          itemName={locItemName}
          sellerID={locSellerID}
          description={locDescription}
          sellerName={locSellerName}
        />
      </ThemeProvider>
    );
  }

  if (locState === "Evaluating Offers") {
    return (
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={"Product Listing Page"} />
        <EvaluatingOffers
          coverImage={locCoverImage}
          secondaryImage1={locSecondaryImage1}
          secondaryImage2={locSecondaryImage2}
          secondaryImage3={locSecondaryImage3}
          secondaryImage4={locSecondaryImage4}
          itemName={locItemName}
          sellerID={locSellerID}
          sellerName={locSellerName}
          category={locCategory}
          condition={locCondition}
          location={locLocation}
          description={locDescription}
          role={locRole}
        />
      </ThemeProvider>
    );
  }

  if (locState === "Sold") {
    return (
      <ThemeProvider theme={theme}>
        <DefaultBanner banner={"Product Listing Page"} />
        <Sold
          coverImage={locCoverImage}
          secondaryImage1={locSecondaryImage1}
          secondaryImage2={locSecondaryImage2}
          secondaryImage3={locSecondaryImage3}
          secondaryImage4={locSecondaryImage4}
          itemName={locItemName}
          sellerID={locSellerID}
          sellerName={locSellerName}
          category={locCategory}
          condition={locCondition}
          location={locLocation}
          description={locDescription}
        />
      </ThemeProvider>
    );
  }
}
