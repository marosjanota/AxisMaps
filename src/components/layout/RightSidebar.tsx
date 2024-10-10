import React from 'react';
import { Box, Button, Divider, Stack, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AxisButton from '../Button.tsx';


export default function(){
  return (
    <Box 
      sx={{
        width: '250px',
        backgroundColor: 'var(--color-mui-background-secondary)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px'
      }}
    >

      <Stack spacing={2}>
        <Typography variant="h6">Map toolbar</Typography>

        <AxisButton onClickFunction={() => console.log("Zoom In")}>Zoom In</AxisButton>
        <AxisButton onClickFunction={() => console.log("Zoom Out")}>Zoom Out</AxisButton>
        <Divider />

        <AxisButton onClickFunction={() => console.log("Reset map")}>Reset Map</AxisButton>

      </Stack>
    </Box>
  );
}

