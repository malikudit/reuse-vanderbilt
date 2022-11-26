import { React } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";
import DefaultBanner from "../components/DefaultBanner";
import ExchangeInfo from "../components/ExchangeInfo";
import LiveSale from "../components/LiveSale";

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
  const locItemName = useLocation().state.itemName;
  const locDescription = useLocation().state.description;
  const locSellerName = useLocation().state.seller;
  const locCondition = useLocation().state.condition;
  const locLocation = useLocation().state.location;
  const locListingType = useLocation().state.listingType;
  const locCurrentBid = useLocation().state.currentBid;
  const locBidIncrement = useLocation().state.bidIncrement;
  const locBuyNow = useLocation().state.buyNow;
  const locListingPrice = useLocation().state.listingPrice;
  const locTimeLeft = useLocation().state.expirationDate;
  const locCategory = useLocation().state.category;
  const locSellerID = useLocation().state.sellerID;
  const nextBid = locCurrentBid + " + " + locBidIncrement;
  var timeLeft = new Date(locTimeLeft).getTime();
  var now = new Date().getTime();
  var expired = timeLeft - now;

  return (
    <ThemeProvider theme={theme}>
      <DefaultBanner banner={"Product Listing Page"} />
      {console.log(timeLeft)}
      {console.log(now)}
      {console.log(timeLeft - now)}
      {expired <= 0 ? (
        <ExchangeInfo
          coverImage={locCoverImage}
          itemName={locItemName}
          sellerID={locSellerID}
          sellerName={locSellerName}
          category={locCategory}
          condition={locCondition}
          location={locLocation}
          description={locDescription}
        />
      ) : (
        <LiveSale
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
          buyNow={locBuyNow}
          listingType={locListingType}
          nextBid={nextBid}
          listingPrice={locListingPrice}
          description={locDescription}
        />
      )}
    </ThemeProvider>
  );
}
