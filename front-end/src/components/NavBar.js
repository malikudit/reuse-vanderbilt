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
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PersonIcon from "@mui/icons-material/Person";

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
  const [home, setHome] = React.useState(true);
  const [notifications, setNotifications] = React.useState(false);
  const [listings, setListings] = React.useState(false);
  const [profile, setProfile] = React.useState(false);

  const clearAll = () => {
    setHome(false);
    setNotifications(false);
    setListings(false);
    setProfile(false);
  };

  const handleHome = () => {
    clearAll();
    setHome(true);
  };

  const handleNotifications = () => {
    clearAll();
    setNotifications(true);
  };

  const handleListings = () => {
    clearAll();
    setListings(true);
  };

  const handleProfile = () => {
    clearAll();
    setProfile(true);
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
            <Typography variant="h3" color="neutral">
              Reuse
            </Typography>
            <Typography variant="h3" color="secondary" sx={{ flexGrow: 1 }}>
              Vandy
            </Typography>
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <Stack direction="row" spacing={0}>
            <Button
              component={Link}
              to="/"
              color={home === true ? "secondary" : "neutral"}
              onClick={handleHome}
            >
              <HomeIcon sx={{ padding: 1 }} />
              Home
            </Button>
            <Button
              component={Link}
              to="/notifications"
              color={notifications === true ? "secondary" : "neutral"}
              onClick={handleNotifications}
            >
              <NotificationsActiveIcon sx={{ padding: 1 }} />
              Notifications
            </Button>
            <Button
              component={Link}
              to="/listings"
              color={listings === true ? "secondary" : "neutral"}
              onClick={handleListings}
            >
              <NotificationsActiveIcon sx={{ padding: 1 }} />
              My Listings
            </Button>
            <Button
              component={Link}
              to="/profile"
              color={profile === true ? "secondary" : "neutral"}
              onClick={handleProfile}
            >
              <PersonIcon sx={{ padding: 1 }} />
              Profile
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
