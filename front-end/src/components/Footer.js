import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper sx={{ bottom: 0 }} component="footer" square variant="outlined">
      <Grid
        container
        justifyContent={"space-evenly"}
        sx={{
          flexGrow: 1,
          display: "flex",
          my: 1,
        }}
      >
        <Typography
          variant="h8"
          noWrap
          component={Link}
          to="/faq"
          underline="none"
          sx={{ color: "blue" }}
        >
          FAQ
        </Typography>
        <Typography variant="h8" noWrap underline="none" sx={{ color: "blue" }}>
          <a href={`mailto:mason.rangee@gmail.com`}>
            Report a Bug or Leave a Comment
          </a>
        </Typography>
      </Grid>

      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          mb: 2,
        }}
      >
        <Typography variant="caption" color="initial">
          Reuse Vandy 2022.
        </Typography>
      </Box>
    </Paper>
  );
}
