import { Route, Routes } from "react-router";
import CategoryPage from "./pages/CategoryPage.js";
import Notifications from "./pages/Notifications.js";
import ListingsPage from "./pages/ListingsPage.js";
import Profile from "./pages/Profile.js";
import CreateListings from "./components/CreateListings.js";
import ProductPage from "./pages/ProductPage.js";
import ReviewPage from "./pages/ReviewPage.js";

export default function MainRoutes(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            categoryProduct={"Home"}
            setCategoryProduct={props.setCategoryProduct}
          />
        }
      />
      <Route
        path="/books"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            setCategoryProduct={"Books"}
            categoryProduct={props.categoryProduct}
          />
        }
      />
      <Route
        path="/clothing"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            setCategoryProduct={props.setCategoryProduct}
            categoryProduct={props.categoryProduct}
          />
        }
      />
      <Route
        path="/electronics"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            setCategoryProduct={props.setCategoryProduct}
            categoryProduct={props.categoryProduct}
          />
        }
      />
      <Route
        path="/furniture"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            setCategoryProduct={props.setCategoryProduct}
            categoryProduct={props.categoryProduct}
          />
        }
      />
      <Route
        path="/kitchen"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            setCategoryProduct={props.setCategoryProduct}
            categoryProduct={props.categoryProduct}
          />
        }
      />
      <Route
        path="/tickets"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            setCategoryProduct={props.setCategoryProduct}
            categoryProduct={props.categoryProduct}
          />
        }
      />
      <Route
        path="/transportation"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            setCategoryProduct={props.setCategoryProduct}
            categoryProduct={props.categoryProduct}
          />
        }
      />
      <Route
        path="/other"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            setCategoryProduct={props.setCategoryProduct}
            categoryProduct={props.categoryProduct}
          />
        }
      />
      <Route
        path="/product_listing/:category/:itemName"
        element={<ProductPage />}
      />
      <Route
        path="/product_review/:category/:itemName"
        element={<ReviewPage />}
      />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create_listing" element={<CreateListings />} />
    </Routes>
  );
}
