import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography,
  createTheme,
  ThemeProvider,
  Stack,
  Button,
} from "@mui/material";

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

function NavBar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="logo"
          ></IconButton>
          <Typography variant="h3" color="neutral">
            Reuse
          </Typography>
          <Typography variant="h3" color="secondary" sx={{ flexGrow: 1 }}>
            Vandy
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="neutral">Home</Button>
            <Button color="neutral">Notifications</Button>
            <Button color="neutral">Profile</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
