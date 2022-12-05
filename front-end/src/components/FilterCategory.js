import { React, useState, useEffect } from "react";
import { SampleProducts } from "../content/SampleProducts";
import { Grid } from "@mui/material";
import ProductCards from "./ProductCards";
import "../css/ProductCards.css";

export default function FilterCategory(props) {
  const [products, setProducts] = useState([]);

  async function getData(url = "http://localhost:8080/product") {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        var d = data;
        setProducts(d);
      });
    return response;
  }

  useEffect(() => {
    getData();
  }, []);

  function compare(a, b) {
    if (a === null || b === null) {
      return 0;
    }
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
  var filtered = products.sort(compare);
  // var filtered = SampleProducts.sort(compare);

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
        entry.title.toLowerCase().includes(props.searchProduct) ||
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
          key={searchedCategory.title}
          searchProduct={props.searchProduct}
        />
      ))}
    </Grid>
  );
}
