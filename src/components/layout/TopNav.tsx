import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function TopNav() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ background: "var(--color-background-sec)" }}>
        <Typography variant="h6">Axis Maps v2</Typography>
      </Toolbar>
    </AppBar>
  );
}
