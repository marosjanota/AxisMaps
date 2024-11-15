import React from "react";
import { Box } from "@mui/material";
import MapToolbar from "../toolbar/MapToolbar";

export default function RightSidebar() {
  return (
    <Box
      sx={{
        width: "250px",
        backgroundColor: "var(--color-mui-background-secondary)",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <MapToolbar />
    </Box>
  );
}
