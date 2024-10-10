import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FormLabel } from '@mui/material';

export default function OptionsWaterdDetail() {
  return (
    <Box sx={{ width: 300 }}>
        
      <FormLabel >Water detail</FormLabel>
      <Slider
        aria-label="Water detail"
        defaultValue={30}
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
