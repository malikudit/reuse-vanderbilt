import * as React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createTheme,
  TextField,
  Box,
  ThemeProvider,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesIcon from "@mui/icons-material/Devices";
import ChairIcon from "@mui/icons-material/Chair";
import KitchenIcon from "@mui/icons-material/Kitchen";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CategoryPage from "../pages/CategoryPage";

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

export default function SearchBar(props) {
  const [open, setOpen] = React.useState(false);
  const [selectHome, setSelectHome] = React.useState(false);
  const [selectBooks, setSelectBooks] = React.useState(false);
  const [selectClothing, setSelectClothing] = React.useState(false);
  const [selectElectronics, setSelectElectronics] = React.useState(false);
  const [selectFurniture, setSelectFurniture] = React.useState(false);
  const [selectKitchen, setSelectKitchen] = React.useState(false);
  const [selectTickets, setSelectTickets] = React.useState(false);
  const [selectTransportation, setSelectTransportation] = React.useState(false);
  const [selectOther, setSelectOther] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDeselectAll = () => {
    props.setCategoryProduct("");
    setSelectHome(false);
    setSelectBooks(false);
    setSelectClothing(false);
    setSelectElectronics(false);
    setSelectFurniture(false);
    setSelectKitchen(false);
    setSelectTickets(false);
    setSelectTransportation(false);
    setSelectOther(false);
  };

  const handleHome = () => {
    handleDeselectAll();
    setSelectHome(true);
    props.setCategoryProduct("Home");
  };

  const handleBooks = () => {
    handleDeselectAll();
    setSelectBooks(true);
    props.setCategoryProduct("Books");
  };

  const handleClothing = () => {
    handleDeselectAll();
    setSelectClothing(true);
    props.setCategoryProduct("Clothing");
  };

  const handleElectronics = () => {
    handleDeselectAll();
    setSelectElectronics(true);
    props.setCategoryProduct("Electronics");
  };

  const handleFurniture = () => {
    handleDeselectAll();
    setSelectFurniture(true);
    props.setCategoryProduct("Furniture");
  };

  const handleKitchen = () => {
    handleDeselectAll();
    setSelectKitchen(true);
    props.setCategoryProduct("Kitchen");
  };

  const handleTickets = () => {
    handleDeselectAll();
    setSelectTickets(true);
    props.setCategoryProduct("Tickets");
  };

  const handleTransportation = () => {
    handleDeselectAll();
    setSelectTransportation(true);
    props.setCategoryProduct("Transportation");
  };

  const handleOther = () => {
    handleDeselectAll();
    setSelectOther(true);
    props.setCategoryProduct("Other");
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
              direction="column"
              align="center"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontStyle: "helvetica",
              }}
            >
              Welcome to Reuse Vandy! Click an item to bid, buy, or view
              description.
            </Typography>
            <TextField
              label="Search by product title or description"
              variant="filled"
              sx={{
                minWidth: "450px",
                border: "0px",
                boxShadow: "1",
                p: "2",
                fontStyle: "helvetica",
              }}
              onChange={(e) => {
                props.setSearchProduct(e.target.value.toLowerCase());
              }}
              InputProps={{
                className: theme.neutral,
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
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
                <Typography align="center" sx={{ fontWeight: "bold" }}>
                  Product Categories
                </Typography>
                <ListItem
                  key={"Home"}
                  button
                  component={Link}
                  to="/"
                  element=<CategoryPage />
                  onClick={handleHome}
                  selected={selectHome ? true : false}
                  classes={{ selected: theme.primary }}
                >
                  <HomeIcon />
                  <ListItemText> Home </ListItemText>
                </ListItem>
                <ListItem
                  key={"Books"}
                  button
                  component={Link}
                  to="/books"
                  element=<CategoryPage />
                  onClick={handleBooks}
                  selected={selectBooks ? true : false}
                  classes={{ selected: theme.primary }}
                >
                  <MenuBookIcon />
                  <ListItemText> Books </ListItemText>
                </ListItem>
                <ListItem
                  key={"Clothing"}
                  button
                  component={Link}
                  to="/clothing"
                  onClick={handleClothing}
                  selected={selectClothing ? true : false}
                  classes={{ selected: theme.primary }}
                >
                  <CheckroomIcon />
                  <ListItemText> Clothing </ListItemText>
                </ListItem>
                <ListItem
                  key={"Electronics"}
                  button
                  component={Link}
                  to="/electronics"
                  onClick={handleElectronics}
                  selected={selectElectronics ? true : false}
                  classes={{ selected: theme.primary }}
                >
                  <DevicesIcon />
                  <ListItemText> Electronics </ListItemText>
                </ListItem>
                <ListItem
                  key={"Furniture"}
                  button
                  component={Link}
                  to="/furniture"
                  onClick={handleFurniture}
                  selected={selectFurniture ? true : false}
                  classes={{ selected: theme.primary }}
                >
                  <ChairIcon />
                  <ListItemText> Furniture </ListItemText>
                </ListItem>
                <ListItem
                  key={"Kitchen"}
                  button
                  component={Link}
                  to="/kitchen"
                  onClick={handleKitchen}
                  selected={selectKitchen ? true : false}
                  classes={{ selected: theme.primary }}
                >
                  <KitchenIcon />
                  <ListItemText> Kitchen </ListItemText>
                </ListItem>
                <ListItem
                  key={"Tickets"}
                  button
                  component={Link}
                  to="/tickets"
                  onClick={handleTickets}
                  selected={selectTickets ? true : false}
                  classes={{ selected: theme.primary }}
                >
                  <ConfirmationNumberIcon />
                  <ListItemText> Tickets </ListItemText>
                </ListItem>
                <ListItem
                  key={"Transportation"}
                  button
                  component={Link}
                  to="/transportation"
                  onClick={handleTransportation}
                  selected={selectTransportation ? true : false}
                  classes={{ selected: theme.primary }}
                >
                  <PedalBikeIcon />
                  <ListItemText> Transportation </ListItemText>
                </ListItem>
                <ListItem
                  key={"Other"}
                  button
                  component={Link}
                  to="/other"
                  onClick={handleOther}
                  selected={selectOther ? true : false}
                  classes={{ selected: theme.primary }}
                >
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
