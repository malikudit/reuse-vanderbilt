import { Route, Routes } from "react-router";
import NavBar from "./components/nav_bar/NavBar.js";
import SubNavBar from "./components/sub_nav_bar/SubNavBar.js";
import HomePage from "./components/home_page/HomePage.js";
import Notifications from "./components/notifications_page/Notifications.js";
import Profile from "./components/profile_page/Profile.js";

function App() {
  return (
    <>
      <NavBar />
      <SubNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
