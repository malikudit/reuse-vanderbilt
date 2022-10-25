import { React, useState } from "react";
import NavBar from "./components/NavBar.js";
import MainRoutes from "./MainRoutes.js";
import "./App.css";

function App() {
  const [searchProduct, setSearchProduct] = useState([""]);
  const [categoryProduct, setCategoryProduct] = useState([]);

  return (
    <>
      <NavBar />
      <MainRoutes
        searchProduct={searchProduct}
        setSearchProduct={setSearchProduct}
        categoryProduct={categoryProduct}
        setCategoryProduct={setCategoryProduct}
      />
    </>
  );
}

export default App;
