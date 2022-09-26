import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createTheme,
  InputBase,
  Box,
  ThemeProvider,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesIcon from "@mui/icons-material/Devices";
import ChairIcon from "@mui/icons-material/Chair";
import KitchenIcon from "@mui/icons-material/Kitchen";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DAA520",
    },
    secondary: {
      main: "#212121",
    },
    neutral: {
      main: "#ffffff",
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                marginLeft: 30,
                display: { xs: "none", sm: "block" },
              }}
            >
              Welcome to Vanderbilt's Marketplace!
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by product"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Drawer
              variant="persistent"
              anchor="left"
              open={open}
              PaperProps={{
                style: { height: "90%", top: "10%" },
              }}
            >
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
              <Divider />
              <List>
                <ListItem key={"Clothing"} disablePadding>
                  <CheckroomIcon />
                  <ListItemText> Clothing </ListItemText>
                </ListItem>
                <ListItem key={"Electronics"} disablePadding>
                  <DevicesIcon />
                  <ListItemText> Electronics </ListItemText>
                </ListItem>
                <ListItem key={"Furniture"} disablePadding>
                  <ChairIcon />
                  <ListItemText> Furniture </ListItemText>
                </ListItem>
                <ListItem key={"Kitchen"} disablePadding>
                  <KitchenIcon />
                  <ListItemText> Kitchen </ListItemText>
                </ListItem>
                <ListItem key={"Textbooks"} disablePadding>
                  <MenuBookIcon />
                  <ListItemText> Textbooks </ListItemText>
                </ListItem>
                <ListItem key={"Tickets"} disablePadding>
                  <ConfirmationNumberIcon />
                  <ListItemText> Tickets </ListItemText>
                </ListItem>
                <ListItem key={"Transportation"} disablePadding>
                  <PedalBikeIcon />
                  <ListItemText> Transportation </ListItemText>
                </ListItem>
                <ListItem key={"Other"} disablePadding>
                  <QuestionMarkIcon />
                  <ListItemText> Other </ListItemText>
                </ListItem>
              </List>
              <Divider />
            </Drawer>{" "}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
