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
  Box,
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
            <Button component={Link} to="/" color="neutral">
              <HomeIcon sx={{ padding: 1 }} />
              Home
            </Button>
            <Button component={Link} to="/notifications" color="neutral">
              <NotificationsActiveIcon sx={{ padding: 1 }} />
              Notifications
            </Button>
            <Button component={Link} to="/profile" color="neutral">
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
