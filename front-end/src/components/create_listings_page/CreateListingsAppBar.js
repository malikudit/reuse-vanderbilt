import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {ThemeProvider} from '@mui/material'


import { createTheme } from '@mui/material/styles';

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
  

export default function DenseAppBar() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
          <Typography               
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            marginLeft: 80,
            display: { xs: "none", sm: "block" },
          }}>
            Create New Listing
          </Typography>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}