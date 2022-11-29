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
  function compare(a, b) {
    var now = new Date().getTime();
    var aDate = new Date(a.expirationDate).getTime();
    var bDate = new Date(b.expirationDate).getTime();
    if (aDate - now > bDate - now) {
      return -1;
    } else {
      return 1;
    }
  }

  var buying = SampleProducts.sort(compare);
  buying = buying.filter(function (entry) {
    return entry.sellerID !== "Parwaz";
  });

  var selling = SampleProducts.sort(compare);
  selling = selling.filter(function (entry) {
    return entry.sellerID === "Parwaz";
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <DefaultBanner banner={"My Listings"} />
      <Box sx={{ width: "100%", backgroundColor: "#FFFFFF" }}>
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
              label="Products I'm Buying/Bought"
              {...a11yProps(1)}
            />
            <Tab
              icon={<PersonRemoveIcon />}
              iconPosition="start"
              label="Products I'm Selling/Sold"
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
            justifyContent={"space-evenly"}
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
            justifyContent={"space-evenly"}
          >
            {selling.map((sellingProduct) => (
              <ProductCards {...sellingProduct} />
            ))}
          </Grid>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
