import React from "react";
import Form from "../components/RegistrationForm.js";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import NavBar from "../components/NavBar.js";

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

export default function RegisterPage() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box sx={{ width: "100%", backgroundColor: "#FFFFFF" }}>
        <Form></Form>
      </Box>
    </ThemeProvider>
  );
}
