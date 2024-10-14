import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FormLabel } from "@mui/material";

export default function OptionsRoadDetail() {
  return (
    <Box sx={{ width: 300 }}>
      <FormLabel>Road detail</FormLabel>
      <Slider
        aria-label="Road detail"
        defaultValue={50}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={100}
      />
    </Box>
  );
}
