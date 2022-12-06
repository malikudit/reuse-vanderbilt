import { Route, Routes } from 'react-router';
import CategoryPage from './pages/CategoryPage.js';
import Notifications from './pages/NotificationsPage.js';
import NotificationsSettings from './pages/NotificationsSettings.js';
import ListingsPage from './pages/ListingsPage.js';
import Profile from './pages/Profile.js';
import CreateListings from './components/CreateListings.js';
import ProductPage from './pages/ProductPage.js';
import RegisterPage from './pages/Register.js';
import LoginPage from './pages/LoginPage.js';
import ResetPasswordPage from './pages/ResetPassword.js';
import NewReviewPage from './pages/NewReviewPage.js';
import EditProfile from './pages/EditProfile.js';
import OtherProfile from './pages/OtherProfile.js';
import FAQ from './pages/FAQ.js';

export default function MainRoutes(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CategoryPage
            searchProduct={props.searchProduct}
            setSearchProduct={props.setSearchProduct}
            categoryProduct={'Home'}
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
            setCategoryProduct={'Books'}
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
      <Route path="/product_listing/:id" element={<ProductPage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route
        path="/notifications_settings"
        element={<NotificationsSettings />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/:userID" element={<OtherProfile />} />
      <Route path="/edit_profile" element={<EditProfile />} />
      <Route path="/create_listing" element={<CreateListings />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset" element={<ResetPasswordPage />} />
      <Route path="/new_review/:id" element={<NewReviewPage />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}
