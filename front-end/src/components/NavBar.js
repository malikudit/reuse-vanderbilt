import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createTheme,
  Menu,
  MenuItem,
  ThemeProvider,
  Stack,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import QuizIcon from '@mui/icons-material/Quiz';

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#DAA520',
    },
    neutral: {
      main: '#ffffff',
    },
  },
});

const NavBar = () => {
  const [login, setLogin] = React.useState(false);
  const [home, setHome] = React.useState(true);
  const [listings, setListings] = React.useState(false);
  const [profile, setProfile] = React.useState(false);
  const [logout, setLogout] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [faq, setfaq] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const clearAll = () => {
    setLogin(false);
    setHome(false);
    setListings(false);
    setProfile(false);
    setLogout(false);
  };

  const handleLogin = () => {
    clearAll();
    handleClose();
    setProfile(true);
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
    handleClose();
  };

  const handleLogout = () => {
    clearAll();
    setHome(true);
    alert('You have successfully logged out.');
    async function logout(url = 'https://api.reusevandy.org/users/logout') {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        redirect: 'follow',
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    logout('https://api.reusevandy.org/users/logout');
    window.location.href = '/';
    handleClose();
  };

  const handleFAQ = () => {
    clearAll();
    setfaq(true);
    handleClose();
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
              sx={{ flexGrow: 1, fontStyle: 'helvetica' }}
            >
              Vandy
            </Typography>
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <Stack direction="row" spacing={0}>
            <Button
              component={Link}
              to="/"
              color={home === true ? 'secondary' : 'neutral'}
              onClick={handleHome}
              sx={{
                textTransform: 'none',
              }}
            >
              <HomeIcon sx={{ padding: 1 }} />
              HOME
            </Button>
            <Button
              component={Link}
              to="/listings"
              color={listings === true ? 'secondary' : 'neutral'}
              onClick={handleListings}
              sx={{
                textTransform: 'none',
              }}
            >
              <ShoppingCartIcon sx={{ padding: 1 }} />
              MY LISTINGS
            </Button>
            <Button
              color={profile === true ? 'secondary' : 'neutral'}
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <PersonIcon sx={{ padding: 1 }} />
              Profile
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem component={Link} to="/profile" onClick={handleProfile}>
                <PersonIcon />
                View Profile
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleLogin}>
                <LoginIcon />
                Login
              </MenuItem>
              <MenuItem component={Link} to="/" onClick={handleLogout}>
                <LogoutIcon />
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
