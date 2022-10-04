import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar.js";
import HomePage from "./pages/HomePage.js";
import Listings from "./pages/Listings.js";
import Notifications from "./pages/Notifications.js";
import Profile from "./pages/Profile.js";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
