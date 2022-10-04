import { React } from "react";
import {
  AppBar,
  Typography,
  createTheme,
  Box,
  ThemeProvider,
  Grid,
} from "@mui/material";

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

export default function DefaultBanner(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Grid alignItems="center" align="center">
            <Typography
              variant="h6"
              noWrap
              component="div"
              direction="column"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                alignContent: "center",
              }}
            >
              {props.banner}
            </Typography>
          </Grid>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
