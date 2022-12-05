import { React, useState } from "react";
import NavBar from "./components/NavBar.js";
import Footer from "./components/Footer.js";
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
      <Footer />
    </>
  );
}

export default App;
