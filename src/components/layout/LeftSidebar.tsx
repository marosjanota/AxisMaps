import React from "react";
import OptionsBorder from "../options/OptionsBorder";
import OptionsRSL from "../options/OptionsRSL";
import OptionsWaterDetail from "../options/OptionsWaterDetail";
import OptionsRoadDetail from "../options/OptionsRoadDetail";
import OptionsVisibility from "../options/OptionsVisibility";
import { Box, Divider, Stack, TextField } from "@mui/material";

export default function LeftSidebar() {
  return (
    <Box
      sx={{
        width: "340px",
        backgroundColor: "var(--color-mui-background-secondary)",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Title"
          variant="standard"
          sx={{ marginBottom: "16px" }}
        />

        <Divider />
        <OptionsVisibility />
        <Divider />
        <OptionsBorder />
        <Divider />
        <OptionsRSL />
        <Divider />
        <OptionsWaterDetail />
        <Divider />
        <OptionsRoadDetail />
      </Stack>
    </Box>
  );
}
