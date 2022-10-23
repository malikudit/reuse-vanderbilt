import { Link } from "react-router-dom";
import { SampleProducts } from "../content/SampleProducts";
import ProductCards from "./ProductCards";
import { Grid } from "@mui/material";

export default function FilterCategory(props) {
  var filtered;
  if (props.categoryProduct !== "Home") {
    filtered = SampleProducts.filter(function (entry) {
      return entry.category === props.categoryProduct;
    });
  } else {
    filtered = SampleProducts.filter(function (entry) {
      return entry.category;
    });
  }
  if (props.searchProduct[0] !== "") {
    filtered = filtered.filter(function (entry) {
      return entry.itemName.toLowerCase().includes(props.searchProduct);
    });
  }

  return (
    <div>
      <Grid
        container
        alignContent={"center"}
        display="flex"
        justifyContent={"center"}
      >
        {filtered.map((searchedCategory) => (
          <ProductCards
            {...searchedCategory}
            key={searchedCategory.itemName}
            searchProduct={props.searchProduct}
          />
        ))}
      </Grid>
    </div>
  );
}
