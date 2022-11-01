import React from "react";
import Form from "../components/ResetPasswordForm.js";
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

export default function ResetPasswordPage(props) {
    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Box sx={{ width: "100%" }}>
                <Form></Form>
            </Box>
        </ThemeProvider>
    );
}
