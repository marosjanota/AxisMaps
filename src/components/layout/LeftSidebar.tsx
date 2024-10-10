import React from 'react';
import OptionsBorder from '../OptionsBorder.tsx';
import OptionsRSL from '../OptionsRSL.tsx';
import OptionsWaterDetail from '../OptionsWaterDetail.tsx';
import OptionsRoadDetail from '../OptionsRoadDetail.tsx';
import OptionsVisibility from '../OptionsVisibility.tsx';
import { Box, Button, Divider, Stack, TextField } from '@mui/material';

export default function LeftSidebar() {
  return (
    <Box 
      sx={{
        width: '340px',
        backgroundColor: 'var(--color-mui-background-secondary)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px'
      }}
    >
      <Stack spacing={2}>
      
        <TextField label="Title" variant="standard" sx={{ marginBottom: '16px' }}/>

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
