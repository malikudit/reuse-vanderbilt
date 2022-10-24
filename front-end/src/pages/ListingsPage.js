import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  createTheme,
  Grid,
  Tabs,
  Tab,
  Typography,
  ThemeProvider,
} from "@mui/material";
import CreateListings from "../components/CreateListings";
import { SampleProducts } from "../content/SampleProducts";
import ProductCards from "../components/ProductCards";
import DefaultBanner from "../components/DefaultBanner";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tab-panel"
      hidden={value !== index}
      id={`simple-tab-panel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tab-panel-${index}`,
  };
}

export default function ListingsPage(props) {
  var buying = SampleProducts.filter(function (entry) {
    return entry.buying === true;
  });
  var selling = SampleProducts.filter(function (entry) {
    return entry.buying === false;
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <DefaultBanner banner={"My Listings"} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="basic tabs example"
            centered
          >
            <Tab
              icon={<AddIcon />}
              iconPosition="start"
              label="Create A Listing"
              {...a11yProps(0)}
            />
            <Tab
              icon={<PersonAddIcon />}
              iconPosition="start"
              label="Products I'm Buying"
              {...a11yProps(1)}
            />
            <Tab
              icon={<PersonRemoveIcon />}
              iconPosition="start"
              label="Products I'm Selling"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid align={"center"} padding={2}>
            <CreateListings />
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid
            container
            alignContent={"center"}
            display="flex"
            justifyContent={"center"}
          >
            {buying.map((buyingProduct) => (
              <ProductCards {...buyingProduct} />
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid
            container
            alignContent={"center"}
            display="flex"
            justifyContent={"center"}
          >
            {selling.map((buyingProduct) => (
              <ProductCards {...buyingProduct} />
            ))}
          </Grid>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
