import { React, useState } from "react";
import { Route, Routes } from "react-router";
import CategoryPage from "./pages/CategoryPage.js";
import NavBar from "./components/NavBar.js";
import Notifications from "./pages/Notifications.js";
import ListingsPage from "./pages/ListingsPage.js";
import Profile from "./pages/Profile.js";
import CreateListings from "./components/CreateListings.js";
import ProductPage from "./pages/ProductPage.js";
import ReviewPage from "./pages/ReviewPage.js";

function App() {
  const [searchProduct, setSearchProduct] = useState([""]);
  const [categoryProduct, setCategoryProduct] = useState([]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              categoryProduct={"Home"}
              setCategoryProduct={setCategoryProduct}
            />
          }
        />
        <Route
          path="/books"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              setCategoryProduct={"Books"}
              categoryProduct={categoryProduct}
            />
          }
        />
        <Route
          path="/clothing"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              setCategoryProduct={setCategoryProduct}
              categoryProduct={categoryProduct}
            />
          }
        />
        <Route
          path="/electronics"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              setCategoryProduct={setCategoryProduct}
              categoryProduct={categoryProduct}
            />
          }
        />
        <Route
          path="/furniture"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              setCategoryProduct={setCategoryProduct}
              categoryProduct={categoryProduct}
            />
          }
        />
        <Route
          path="/kitchen"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              setCategoryProduct={setCategoryProduct}
              categoryProduct={categoryProduct}
            />
          }
        />
        <Route
          path="/tickets"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              setCategoryProduct={setCategoryProduct}
              categoryProduct={categoryProduct}
            />
          }
        />
        <Route
          path="/transportation"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              setCategoryProduct={setCategoryProduct}
              categoryProduct={categoryProduct}
            />
          }
        />
        <Route
          path="/other"
          element={
            <CategoryPage
              searchProduct={searchProduct}
              setSearchProduct={setSearchProduct}
              setCategoryProduct={setCategoryProduct}
              categoryProduct={categoryProduct}
            />
          }
        />
        <Route path="/product_listing" element={<ProductPage />} />
        <Route path="/product_review" element={<ReviewPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create_listing" element={<CreateListings />} />
      </Routes>
    </>
  );
}

export default App;
