import { SampleProducts } from "../content/SampleProducts";
import { Grid } from "@mui/material";
import ProductCards from "./ProductCards";
import "./ProductCards.css";

export default function FilterCategory(props) {
  function compare(a, b) {
    var now = new Date().getTime();
    var aDate = new Date(a.expirationDate).getTime();
    var bDate = new Date(b.expirationDate).getTime();
    if (aDate - now < bDate - now) {
      return -1;
    } else {
      return 1;
    }
  }

  // Sort items in ascending chronological order
  var filtered = SampleProducts.sort(compare);

  // We are in any category other than home
  if (props.categoryProduct !== "Home") {
    filtered = filtered.filter(function (entry) {
      return entry.category === props.categoryProduct;
    });
  } else {
    // We are in home
    filtered = filtered.filter(function (entry) {
      return entry.category;
    });
  }
  // Configure search regardless of category
  if (props.searchProduct[0] !== "") {
    filtered = filtered.filter(function (entry) {
      return (
        entry.itemName.toLowerCase().includes(props.searchProduct) ||
        entry.description.toLowerCase().includes(props.searchProduct)
      );
    });
  }

  return (
    <Grid
      container
      flex
      justifyContent="space-evenly"
      alignItems="center"
      marginTop={2}
    >
      {filtered.map((searchedCategory) => (
        <ProductCards
          {...searchedCategory}
          key={searchedCategory.itemName}
          searchProduct={props.searchProduct}
        />
      ))}
    </Grid>
  );
}
