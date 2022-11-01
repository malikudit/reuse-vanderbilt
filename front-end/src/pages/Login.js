import React from "react";
import Form from "../components/LoginForm.js";
import {
  Box,
  createTheme,
  ThemeProvider,
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


export default function LoginPage(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%" }}>
        <Form>
        </Form>
      </Box>
    </ThemeProvider>
  );
}
