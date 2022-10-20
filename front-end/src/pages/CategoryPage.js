import React from "react";
import SubNavBar from "../components/SubNavBar";
import FilterCategory from "../components/FilterCategory.js";

export default function CategoryPage(props) {
  return (
    <div>
      <SubNavBar
        setSearchProduct={props.setSearchProduct}
        searchProduct={props.searchProduct}
        setCategoryProduct={props.setCategoryProduct}
        categoryProduct={props.categoryProduct}
      />
      <FilterCategory
        categoryProduct={props.categoryProduct}
        searchProduct={props.searchProduct}
      />
    </div>
  );
}
