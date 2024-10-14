import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: "var(--color-background-sec)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="body1">AXIS dream team ❤️ © 2024</Typography>
    </Box>
  );
}
