import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createTheme,
  ThemeProvider,
  Stack,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#DAA520",
    },
    neutral: {
      main: "#ffffff",
    },
  },
});

const NavBar = () => {
  const [login, setLogin] = React.useState(false);
  const [home, setHome] = React.useState(true);
  const [listings, setListings] = React.useState(false);
  const [profile, setProfile] = React.useState(false);
  const [logout, setLogout] = React.useState(false);

  const clearAll = () => {
    setLogin(false);
    setHome(false);
    setListings(false);
    setProfile(false);
    setLogout(false);
  };

  const handleLogin = () => {
    clearAll();
    setLogin(true);
  };

  const handleHome = () => {
    clearAll();
    setHome(true);
  };

  const handleListings = () => {
    clearAll();
    setListings(true);
  };

  const handleProfile = () => {
    clearAll();
    setProfile(true);
  };

  const handleLogout = () => {
    clearAll();
    setLogout(true);
    alert("You have successfully logged out.");
    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            size="large"
            edge="start"
            color="neutral"
            aria-label="logo"
            onClick={handleHome}
          >
            <Typography variant="h3" color="neutral" fontStyle="helvetica">
              Reuse
            </Typography>
            <Typography
              variant="h3"
              color="secondary"
              sx={{ flexGrow: 1, fontStyle: "helvetica" }}
            >
              Vandy
            </Typography>
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <Stack direction="row" spacing={0}>
            <Button
              component={Link}
              to="/login"
              color={login === true ? "secondary" : "neutral"}
              onClick={handleLogin}
              sx={{
                textTransform: "none",
              }}
            >
              <LoginIcon sx={{ padding: 1 }} />
              Login
            </Button>
            <Button
              component={Link}
              to="/"
              color={home === true ? "secondary" : "neutral"}
              onClick={handleHome}
              sx={{
                textTransform: "none",
              }}
            >
              <HomeIcon sx={{ padding: 1 }} />
              Home
            </Button>
            <Button
              component={Link}
              to="/listings"
              color={listings === true ? "secondary" : "neutral"}
              onClick={handleListings}
              sx={{
                textTransform: "none",
              }}
            >
              <ShoppingCartIcon sx={{ padding: 1 }} />
              My Listings
            </Button>
            <Button
              component={Link}
              to="/profile"
              color={profile === true ? "secondary" : "neutral"}
              onClick={handleProfile}
              sx={{
                textTransform: "none",
              }}
            >
              <PersonIcon sx={{ padding: 1 }} />
              Profile
            </Button>
            <Button
              color={"neutral"}
              onClick={handleLogout}
              sx={{
                textTransform: "none",
              }}
            >
              <LogoutIcon sx={{ padding: 1 }} />
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
