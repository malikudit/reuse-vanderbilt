import { SampleProducts } from "../assets/SampleProducts";
import CategoryCards from "./ProductCards";
import { Grid } from "@mui/material";

export default function FilterCategory(props) {
  console.log(props.categoryProduct);
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
          <CategoryCards
            {...searchedCategory}
            key={searchedCategory.itemName}
            searchProduct={props.searchProduct}
          />
        ))}
      </Grid>
    </div>
  );
}
