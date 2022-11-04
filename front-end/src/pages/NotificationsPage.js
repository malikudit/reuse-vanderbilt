import React from "react";
import { Link } from "react-router-dom";
import DefaultBanner from "../components/DefaultBanner";
import { Grid, Typography } from "@mui/material";

export default function NotificationsPage() {
  return (
    <div>
      <DefaultBanner banner={"Notifications"} />
      <Grid
        align="center"
        container
        fullWidth
        justifyContent="space-between"
        padding={5}
      >
        <Grid
          item
          xs={2}
          sx={{
            border: 1,
            justifyContent: "space-between",
            borderRadius: "16px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Manage Your Notifications
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="/notifications_settings"
            sx={{ textDecoration: "none", fontWeight: "bold" }}
            color="primary"
            underline="none"
          >
            View Settings
          </Typography>
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
            border: 1,
            justifyContent: "space-between",
            borderRadius: "16px",
            backgroundColor: "#ADD8E6",
          }}
        >
          Read this!
        </Grid>
      </Grid>
    </div>
  );
}
